**Schema (MySQL v5.7)**

    CREATE TABLE client(
      id SERIAL,
      personID INT(8) NOT NULL,
      fullname VARCHAR(50),
      age INTEGER NOT NULL,
      temperture DECIMAL (3,1),
      hobbie TEXT);
      
    INSERT INTO client(id, personID, fullname,age,temperture,hobbie)
    VALUES (1, 43221357, 'Lina',37,36.5,'play whit my nices'),
    (2, 53901423, 'Juan',28,37.2,'reading books'),
    (3, 12457896, 'Carla',22,36.8,'watching movies'),
    (4, 87362901, 'Pedro',45,37.3,'playing football');
    
    

---

**Query #1**

    SELECT * FROM client;

| id  | personID | fullname | age | temperture | hobbie             |
| --- | -------- | -------- | --- | ---------- | ------------------ |
| 1   | 43221357 | Lina     | 37  | 36.5       | play whit my nices |
| 2   | 53901423 | Juan     | 28  | 37.2       | reading books      |
| 3   | 12457896 | Carla    | 22  | 36.8       | watching movies    |
| 4   | 87362901 | Pedro    | 45  | 37.3       | playing football   |

![LIST ALL](../img/MySQL%20list%20all.jpg)

---
**Query #2**

    SELECT * FROM client
    WHERE fullname = 'Lina';

| id  | personID | fullname | age | temperture | hobbie             |
| --- | -------- | -------- | --- | ---------- | ------------------ |
| 1   | 43221357 | Lina     | 37  | 36.5       | play whit my nices |

![LIST BY NAME](../img/MySQL%20list%20by%20name.jpg)

---
**Query #3**

    SELECT * FROM client
    WHERE id = 1;

| id  | personID | fullname | age | temperture | hobbie             |
| --- | -------- | -------- | --- | ---------- | ------------------ |
| 1   | 43221357 | Lina     | 37  | 36.5       | play whit my nices |

![LIST BY ID](../img/MySQL%20list%20by%20id.jpg)

---
**Query #4**

    UPDATE client
     SET temperture = 36.1
     WHERE id = 3;

There are no results to be displayed.

![UPDATE BY ID](../img/MySQL%20update%20by%20id.jpg)

---
**Query #5**

    DELETE FROM client
    WHERE id = 4;

There are no results to be displayed.

![DELETE BY ID](../img/MySQL%20delete%20by%20id.jpg)

---
**Query #6**

    SELECT * FROM client;

| id  | personID | fullname | age | temperture | hobbie             |
| --- | -------- | -------- | --- | ---------- | ------------------ |
| 1   | 43221357 | Lina     | 37  | 36.5       | play whit my nices |
| 2   | 53901423 | Juan     | 28  | 37.2       | reading books      |
| 3   | 12457896 | Carla    | 22  | 36.1       | watching movies    |

---

[View on DB Fiddle](https://www.db-fiddle.com/)