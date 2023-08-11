INSERT INTO department (name)
VALUES ("Engineering"), ("Business"), ("Legal"), ("Sales");

INSERT INTO
    roles (title, department, salary)
VALUES ("Sales Lead", "Sales", 100000), ("Salesperson", "Sales", 80000), (
        "Lead Developer",
        "Engineering",
        150000
    ), (
        "Software Developer",
        "Engineering",
        220000
    ), (
        "Account Manager",
        "Business",
        160000
    ), (
        "Accountant",
        "Business",
        125000
    ), (
        "Legal Team Lead",
        "Legal",
        250000
    ), ("Lawyer", "Legal", 200000);

INSERT INTO
    employees (
        first_name,
        last_name,
        title,
        department,
        salary,
        manager
    )
VALUES (
        "Steve",
        "Kim",
        "Sales Lead",
        "Sales",
        100000,
        "NULL"
    ), (
        "Demar",
        "Derozan",
        "Salesperson",
        "Sales",
        80000,
        "Steve Kim"
    ), (
        "Clayton",
        "Kershaw",
        "Lead Developer",
        "Engineering",
        150000,
        "NULL"
    ), (
        "Marcus",
        "Rashford",
        "Software Developer",
        "Engineering",
        120000,
        "Clayton Kershaw"
    ), (
        "Tyler",
        "Lockett",
        "Account Manager",
        "Business",
        160000,
        "NULL"
    ), (
        "Zach",
        "Lavine",
        "Accountant",
        "Business",
        125000,
        "Tyler Lockett"
    ), (
        "Mookie",
        "Betts",
        "Legal Team Lead",
        "Legal",
        250000,
        "NULL"
    ), (
        "Lisandro",
        "Martinez",
        "Lawyer",
        "Legal",
        190000,
        "Mookie Betts"
    );