CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT,
  email TEXT,
  password TEXT
);

INSERT INTO users (name, email, password)
VALUES ('John', 'john@mail.com', '123456');

INSERT INTO users (name, email, password)
VALUES ('Pedro', 'pedro@mail.com', '123456');

INSERT INTO users (name, email, password)
VALUES ('Luis', 'luis@mail.com', '123456');