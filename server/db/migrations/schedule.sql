CREATE TABLE schedule(schedule_id SERIAL PRIMARY KEY,title TEXT,date TEXT,importance INTEGER, memo TEXT,user_id INTEGER REFERENCES seeker(seeker_id),company_id INTEGER REFERENCES company(company_id));