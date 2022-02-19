CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes INT DEFAULT 0
);

insert into blogs (author, url, title) values ('Nobody', 'notexist.com', 'The way to study');
insert into blogs (author, url, title) values ('Nobody', 'exist.com', 'I will sleep');