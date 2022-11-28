-- CREATE TABLE seeker(seeker_id SIREAL PRIMARY KEY,);
-- ALTER TABLE company ALTER COLUMN location TYPE POINT USING location::POINT;
-- ALTER TABLE schedule ADD COLUMN timeIncluded BOOLEAN;
ALTER TABLE schedule DROP COLUMN time;
-- ALTER TABLE schedule RENAME COLUMN memo TO description;
-- ADD COLUMN avatar TEXT DEFAULT NULL
-- SELECT * FROM schedule;
-- SELECT * FROM seeker;
-- DROP TABLE company;
-- DELETE FROM company WHERE company.company_id = 3;