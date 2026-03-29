-- Enable UUID extension (PostgreSQL)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- USERS TABLE

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    employee_id VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,

    role VARCHAR(50) NOT NULL CHECK (role IN ('hr', 'admin', 'employee')),

    dob DATE,
    joining_date DATE,
    location VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);


-- SALARIES TABLE

CREATE TABLE salaries (
    salary_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    base_salary NUMERIC NOT NULL,
    bonus NUMERIC DEFAULT 0,
    deductions NUMERIC DEFAULT 0,

    month VARCHAR(20) NOT NULL,
    year INT NOT NULL,

    net_salary NUMERIC NOT NULL,

    user_id UUID,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_salary_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);


-- LEAVES TABLE

CREATE TABLE leaves (
    leave_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    employee_id VARCHAR(255) NOT NULL,

    leave_type VARCHAR(50) NOT NULL CHECK (leave_type IN ('sick', 'casual', 'earned')),

    start_date DATE NOT NULL,
    end_date DATE NOT NULL,

    reason TEXT NOT NULL,

    status VARCHAR(50) DEFAULT 'pending'
        CHECK (status IN ('pending', 'approved', 'rejected')),

    approved_by VARCHAR(255),

    user_id UUID,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_leave_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);


-- LEAVE BALANCES TABLE

CREATE TABLE leave_balances (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    sick_leaves INT DEFAULT 3,
    casual_leaves INT DEFAULT 3,
    earned_leaves INT DEFAULT 1,

    user_id UUID UNIQUE,

    CONSTRAINT fk_leave_balance_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);