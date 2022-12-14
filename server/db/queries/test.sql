-- CREATE TABLE seeker(seeker_id SIREAL PRIMARY KEY,);
-- ALTER TABLE company ALTER COLUMN location TYPE TEXT USING location::TEXT;
-- ALTER TABLE schedule ADD COLUMN allDay BOOLEAN;
-- ALTER TABLE seeker ADD COLUMN location POINT;
-- ALTER TABLE company ADD COLUMN company_size TEXT;
-- ALTER TABLE company ADD COLUMN seeker_id INTEGER REFERENCES seeker(seeker_id);
-- ALTER TABLE schedule DROP COLUMN time;
ALTER TABLE schedule RENAME COLUMN backendcolor TO color;
-- ADD COLUMN avatar TEXT DEFAULT NULL
-- SELECT * FROM schedule;
-- SELECT * FROM seeker;
-- DROP TABLE document;
-- DELETE FROM company WHERE company.company_id = 9;s
-- DELETE FROM seeker WHERE seeker.seeker_id = 10;
DELETE FROM schedule WHERE schedule.schedule_id = 1;
-- UPDATE WHERE seeker.seeker_id = 9;