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
    (4, 87362901, 'Pedro',45,37.3,'playing football'),
    (5, 29384756, 'Miguel', 31, 36.9, 'playing guitar'),
	(6, 67382910, 'Ana', 19, 37.1, 'drawing'),
	(7, 87453921, 'Santiago', 55, 37.5, 'fishing');
    
    

---

**Query #1**
LIST ALL

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
LIST BY NAME

    SELECT * FROM client
    WHERE fullname = 'Lina';

| id  | personID | fullname | age | temperture | hobbie             |
| --- | -------- | -------- | --- | ---------- | ------------------ |
| 1   | 43221357 | Lina     | 37  | 36.5       | play whit my nices |

![LIST BY NAME](../img/MySQL%20list%20by%20name.jpg)

---
**Query #3**
LIST BY ID

    SELECT * FROM client
    WHERE id = 1;

| id  | personID | fullname | age | temperture | hobbie             |
| --- | -------- | -------- | --- | ---------- | ------------------ |
| 1   | 43221357 | Lina     | 37  | 36.5       | play whit my nices |

![LIST BY ID](../img/MySQL%20list%20by%20id.jpg)

---
**Query #4**
UPDATE BY ID

    UPDATE client
     SET temperture = 36.1
     WHERE id = 3;

There are no results to be displayed.

![UPDATE BY ID](../img/MySQL%20update%20by%20id.jpg)

---
**Query #5**
DELETE BY ID

    DELETE FROM client
    WHERE id = 4;

There are no results to be displayed.

![DELETE BY ID](../img/MySQL%20delete%20by%20id.jpg)

---
**Query #6**
LIST ALL 

    SELECT * FROM client;

| id  | personID | fullname | age | temperture | hobbie             |
| --- | -------- | -------- | --- | ---------- | ------------------ |
| 1   | 43221357 | Lina     | 37  | 36.5       | play whit my nices |
| 2   | 53901423 | Juan     | 28  | 37.2       | reading books      |
| 3   | 12457896 | Carla    | 22  | 36.1       | watching movies    |


---

**Query #7**
LIST ALL WITH FEVER
CLIENT UPDATED (4, 87362901, 'Pedro',45,38.3,'playing football');

    SELECT * FROM client
    WHERE temperture >37.4;

| id  | personID | fullname | age | temperture | hobbie           |
| --- | -------- | -------- | --- | ---------- | ---------------- |
| 4   | 87362901 | Pedro    | 45  | 38.3       | playing football |

---

**Query #8**
LIST NAMES WITH FEVER

    SELECT fullname FROM client
    WHERE temperture >37.4;

| fullname |
| -------- |
| Pedro    |

---

**Schema (MySQL v5.7)**

    CREATE TABLE client(
      id SERIAL,
      personID INT(8) NOT NULL,
      fullname VARCHAR(50),
      age INT NOT NULL,
      temperture DECIMAL (3,1),
      hobbie TEXT);
      
    INSERT INTO client(id, personID, fullname,age,temperture,hobbie)
    VALUES (1, 43221357, 'Lina',37,36.5,'play whit my nices'),
    (2, 53901423, 'Juan',28,37.2,'reading books'),
    (3, 12457896, 'Carla',22,36.8,'watching movies'),
    (4, 87362901, 'Pedro',45,38.3,'playing football');
    
    

---

**Query #9**
List hobbie that contains word books

    SELECT * FROM client
    WHERE hobbie LIKE '%books%';

| id  | personID | fullname | age | temperture | hobbie        |
| --- | -------- | -------- | --- | ---------- | ------------- |
| 2   | 53901423 | Juan     | 28  | 37.2       | reading books |

---

**Schema (MySQL v5.7)**

    CREATE TABLE client(
      id SERIAL,
      personID INT(8) NOT NULL,
      fullname VARCHAR(50),
      age INT NOT NULL,
      temperture DECIMAL (3,1),
      hobbie TEXT);
      
    INSERT INTO client(id, personID, fullname,age,temperture,hobbie)
    VALUES (1, 43221357, 'Lina',37,36.5,'play whit my nices'),
    (2, 53901423, 'Juan',28,37.2,'reading books'),
    (3, 12457896, 'Carla',22,36.8,'watching movies'),
    (4, 87362901, 'Pedro',45,38.3,'playing football');
    
    

---

**Query #1**

    DELETE FROM client
    WHERE hobbie LIKE '%s';

There are no results to be displayed.

---
**Query #10**
DELETE hobbie THAT ENDS WITH S

    SELECT * FROM client;

| id  | personID | fullname | age | temperture | hobbie           |
| --- | -------- | -------- | --- | ---------- | ---------------- |
| 4   | 87362901 | Pedro    | 45  | 38.3       | playing football |

---

**CONSULTAS DE DOS TABLAS**
**Schema (MySQL v5.7)**

    CREATE TABLE productos (
      id SERIAL PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL,
      descripcion TEXT,
      precio DECIMAL(10, 2) NOT NULL,
      inventario INTEGER NOT NULL
    );
    
    CREATE TABLE clientes (
      id SERIAL PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL,
      apellido TEXT,
      edad INTEGER NOT NULL, 
      producto VARCHAR(100) NOT NULL
    );
    
    INSERT INTO productos (nombre, descripcion, precio, inventario)
    VALUES ('Producto 1', 'Descripción del producto 1', 10.99, 100),
           ('Producto 2', 'Descripción del producto 2', 19.99, 50),
           ('Producto 3', 'Descripción del producto 3', 5.99, 200);
    
    INSERT INTO clientes (nombre, apellido, edad, producto)
    VALUES ('Persona 1', 'Apellido 1', 10, 'Producto 2'),
           ('Persona 2', 'Apellido 2', 50, 'Producto 2'),
           ('Persona 3', 'Apellido 3', 22, 'Producto 3');
    

---

**Query #1**

    SELECT * FROM productos;

| id  | nombre     | descripcion                | precio | inventario |
| --- | ---------- | -------------------------- | ------ | ---------- |
| 1   | Producto 1 | Descripción del producto 1 | 10.99  | 100        |
| 2   | Producto 2 | Descripción del producto 2 | 19.99  | 50         |
| 3   | Producto 3 | Descripción del producto 3 | 5.99   | 200        |

---
**Query #2**

    SELECT * FROM clientes;

| id  | nombre    | apellido   | edad | producto   |
| --- | --------- | ---------- | ---- | ---------- |
| 1   | Persona 1 | Apellido 1 | 10   | Producto 2 |
| 2   | Persona 2 | Apellido 2 | 50   | Producto 2 |
| 3   | Persona 3 | Apellido 3 | 22   | Producto 3 |

---
**Query #3**

    SELECT clientes.nombre, productos.precio
    FROM productos
    INNER JOIN clientes ON productos.nombre = clientes.producto;

| nombre    | precio |
| --------- | ------ |
| Persona 1 | 19.99  |
| Persona 2 | 19.99  |
| Persona 3 | 5.99   |

---

**Schema (PostgreSQL v15)**

        CREATE TABLE client(
          id SERIAL PRIMARY KEY,
          personID INTEGER NOT NULL,
          fullname VARCHAR(50),
          age INTEGER NOT NULL,
          temperture DECIMAL(3,1),
          hobbie TEXT
        );
          
     INSERT 
     	INTO client(id, personID, fullname, age, temperture, hobbie)
     VALUES 
     	(1, 43221357, 'Lina',37,36.5,'play whit my nices'),
        (2, 53901423, 'Juan',28,37.2,'reading books'),
        (3, 12457896, 'Carla',22,36.8,'watching movies'),
        (4, 87362901, 'Pedro',45,37.3,'playing football'),
        (5, 29384756, 'Miguel', 31, 36.9, 'playing guitar'),
    	(6, 67382910, 'Ana', 19, 37.1, 'drawing'),
    	(7, 87453921, 'Santiago', 55, 37.5, 'fishing');

---

**Query #1**

    SELECT * FROM client
    	WHERE age >30
    	ORDER BY personID ASC
    	OFFSET 1
    	LIMIT 3;

| id  | personid | fullname | age | temperture | hobbie             |
| --- | -------- | -------- | --- | ---------- | ------------------ |
| 1   | 43221357 | Lina     | 37  | 36.5       | play whit my nices |
| 4   | 87362901 | Pedro    | 45  | 37.3       | playing football   |
| 7   | 87453921 | Santiago | 55  | 37.5       | fishing            |

---
