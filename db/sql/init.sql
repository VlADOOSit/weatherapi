CREATE TABLE "Subscriptions" (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    last_sent_at TIMESTAMP,
    city VARCHAR(100) NOT NULL,
    frequency VARCHAR(10) NOT NULL CHECK (frequency IN ('hourly', 'daily')),
    email_confirmed BOOLEAN NOT NULL DEFAULT false
);
