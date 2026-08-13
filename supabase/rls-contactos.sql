-- Politica de acceso para la tabla Contactos
-- ============================================================
--
-- POR QUE EXISTE ESTE ARCHIVO
--
-- La anon key va incrustada en el JavaScript que se envia al navegador.
-- Eso es correcto y es como Supabase esta disenado: la clave identifica al
-- proyecto, no autoriza nada por si misma. Quien autoriza es Row Level
-- Security.
--
-- Sin RLS, esa clave publica se convierte en acceso total. Comprobado
-- contra la base de datos el 2026-08-13, usando solo la clave que ve
-- cualquier visitante del sitio:
--
--     SELECT   HTTP 200   permitido   <- se leen todos los mensajes
--     UPDATE   HTTP 204   permitido   <- se pueden alterar
--     DELETE   HTTP 204   permitido   <- se pueden borrar todos
--
-- Un formulario de contacto solo necesita una cosa: poder escribir.
--
-- COMO APLICARLO
--
-- Panel de Supabase -> SQL Editor -> pegar y ejecutar.

-- 1. Activar RLS. Mientras este desactivado, cualquier politica que se
--    escriba es decorativa: no se evalua.
alter table public."Contactos" enable row level security;

-- 2. Empezar de cero. Una politica permisiva olvidada bastaria para
--    reabrir el agujero, porque en Postgres las politicas se suman: basta
--    con que UNA deje pasar.
--
--    El `if exists` hace que todo el archivo se pueda ejecutar tantas
--    veces como haga falta sin dar error. Sin el, un segundo intento
--    fallaria al llegar al `create policy` por nombre duplicado.
drop policy if exists "Enable insert for anon" on public."Contactos";
drop policy if exists "Enable read access for all users" on public."Contactos";
drop policy if exists "Contactos insert anonimo" on public."Contactos";

-- 3. Lo unico que se concede al visitante: insertar.
--    Sin politica de SELECT, UPDATE ni DELETE para `anon`. Al no existir,
--    quedan denegadas por defecto.
create policy "Contactos insert anonimo"
  on public."Contactos"
  for insert
  to anon
  with check (true);

-- Los mensajes se leen desde el panel de Supabase o con la service_role
-- key, que NUNCA debe salir del servidor ni entrar en el repositorio.

-- ============================================================
-- VERIFICAR QUE FUNCIONO
--
-- Desde una terminal, con la anon key (la misma que hay en .env):
--
--   curl -s -o /dev/null -w "%{http_code}\n" \
--     -H "apikey: TU_ANON_KEY" \
--     "https://TU-PROYECTO.supabase.co/rest/v1/Contactos?select=id&limit=1"
--
-- Antes: 200. Despues debe devolver 401 o 403.
-- Y el formulario del sitio debe seguir enviando sin errores.
