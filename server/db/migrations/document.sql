CREATE TABLE document(document_id SERIAL PRIMARY KEY,type TEXT,url TEXT,company_id INTEGER REFERENCES company(company_id),seeker_id INTEGER REFERENCES seeker(seeker_id));