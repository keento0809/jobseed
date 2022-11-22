-- CREATE TABLE seeker(seeker_id SIREAL PRIMARY KEY,);
-- ALTER TABLE company ALTER COLUMN interest TYPE INTEGER USING interest::INTEGER;
ALTER TABLE company ADD COLUMN interest INTEGER;
-- ADD COLUMN avatar TEXT DEFAULT NULL
-- SELECT * FROM schedule;
-- SELECT * FROM seeker;
-- DROP TABLE company;
-- DELETE FROM company WHERE company.company_id = 3;