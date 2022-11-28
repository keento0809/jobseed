-- CREATE TABLE seeker(seeker_id SIREAL PRIMARY KEY,);
ALTER TABLE company ALTER COLUMN location TYPE POINT USING location::POINT;
-- ALTER TABLE company DROP COLUMN company_size;
-- ADD COLUMN avatar TEXT DEFAULT NULL
-- SELECT * FROM schedule;
-- SELECT * FROM seeker;
-- DROP TABLE company;
-- DELETE FROM company WHERE company.company_id = 3;