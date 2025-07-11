CREATE OR REPLACE PROCEDURE create_vector_extension()
LANGUAGE plpgsql
AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'vector') THEN
        CREATE EXTENSION vector;
    END IF;
END;
$$;

CALL create_vector_extension();