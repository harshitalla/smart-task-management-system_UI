CREATE DATABASE IF NOT EXISTS task_management;
USE task_management;

CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tasks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    priority ENUM('Low', 'Medium', 'High') DEFAULT 'Medium',
    status ENUM('Pending', 'In Progress', 'Completed') DEFAULT 'Pending',
    deadline DATE,
    assigned_to INT,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_tasks_status (status),
    INDEX idx_tasks_assigned_to (assigned_to)
);

INSERT IGNORE INTO users (name, email, password, role)
VALUES
('Admin User', 'admin@example.com',
'$2a$10$7EqJtq98hPqEX7fNZaFWoO7ZqQ7F5k9JjR9xV6Vxj7Gm7J3N8YJQK',
'admin'),
('Normal User', 'user@example.com',
'$2a$10$7EqJtq98hPqEX7fNZaFWoO7ZqQ7F5k9JjR9xV6Vxj7Gm7J3N8YJQK',
'user');
