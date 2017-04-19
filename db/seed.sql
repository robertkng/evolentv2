BEGIN;

INSERT INTO contacts (first_name, last_name, email, phone_number, status) VALUES
('George', 'Washington', 'george.washington@president.com', '2021234567', 'Active'),
('Thomas', 'Jefferson', 'thomas.jefferson@president.com', '2029876543', 'Inactive'),
('Abraham', 'Lincoln', 'abraham.lincoln@president.com', '2026543123', 'Active');

COMMIT;
