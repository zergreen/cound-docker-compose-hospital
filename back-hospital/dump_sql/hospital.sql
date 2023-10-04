CREATE TABLE Position
(
Position_ID INT NOT NULL,
Position_Name VARCHAR(255) NOT NULL,
PRIMARY KEY (Position_ID)
);

CREATE TABLE Department
(
Department_ID INT NOT NULL,
Department_name VARCHAR(255) NOT NULL,
PRIMARY KEY (Department_ID)
);

CREATE TABLE Patient
(
Patient_Sex VARCHAR(10) NOT NULL,
Patient_Tel1 VARCHAR(20) NOT NULL,
Patient_Tel2 VARCHAR(20) NOT NULL,
Patient_Address VARCHAR(255) NOT NULL,
Patient_ID INT NOT NULL,
Patient_NRelative VARCHAR(255) NOT NULL,
Patient_name VARCHAR(255) NOT NULL,
Patient_lname VARCHAR(255) NOT NULL,
Patient_BD DATE NOT NULL,
Patient_Allergic VARCHAR(255) NOT NULL,
Patient_Disease VARCHAR(255) NOT NULL,
Patient_TelRelative VARCHAR(20) NOT NULL,
PRIMARY KEY (Patient_ID)
);

CREATE TABLE ProSer_Type
(
Patterns_ID INT NOT NULL,
Pattern_Name VARCHAR(255) NOT NULL,
PRIMARY KEY (Patterns_ID)
);

CREATE TABLE Factor
(
Code INT NOT NULL,
Name VARCHAR(255) NOT NULL,
Unit_Detail VARCHAR(255) NOT NULL,
Min_Unit INT NOT NULL,
Max_Unit INT NOT NULL,
PRIMARY KEY (Code)
);

CREATE TABLE Employee
(
Employee_ID INT NOT NULL,
Employee_name VARCHAR(255) NOT NULL,
Employee_Lname VARCHAR(255) NOT NULL,
Employee_sex VARCHAR(10) NOT NULL,
Employee_tel1 VARCHAR(20) NOT NULL,
Employee_tel2 VARCHAR(20) NOT NULL,
Employee_SP VARCHAR(255) NOT NULL,
Position_ID INT NOT NULL,
Department_ID INT NOT NULL,
PRIMARY KEY (Employee_ID)
);

CREATE TABLE Main_action
(
discount FLOAT NOT NULL,
Code INT NOT NULL,
date DATE NOT NULL,
vat FLOAT NOT NULL,
total FLOAT NOT NULL,
Employee_ID INT NOT NULL,
dispenseEmployee_ID INT NOT NULL,
financeEmployee_ID INT NOT NULL,
Patient_ID INT NOT NULL,
PRIMARY KEY (Code),
FOREIGN KEY (Employee_ID) REFERENCES Employee(Employee_ID),
FOREIGN KEY (dispenseEmployee_ID) REFERENCES Employee(Employee_ID),
FOREIGN KEY (financeEmployee_ID) REFERENCES Employee(Employee_ID),
FOREIGN KEY (Patient_ID) REFERENCES Patient(Patient_ID)
);

CREATE TABLE ProSer
(
ProSer_ID INT NOT NULL,
ProSer_Name VARCHAR(255) NOT NULL,
ProSer_SROCK INT NOT NULL,
ProSer_PRICE FLOAT NOT NULL,
ProSer_Detail VARCHAR(255) NOT NULL,
ProSer_Effects VARCHAR(255) NOT NULL,
Patterns_ID INT NOT NULL,
PRIMARY KEY (ProSer_ID),
FOREIGN KEY (Patterns_ID) REFERENCES ProSer_Type(Patterns_ID)
);

CREATE TABLE Inspection_detail
(
Inspection_Name VARCHAR(255) NOT NULL,
Inspection_ID INT NOT NULL,
ProSer_ID INT NOT NULL,
Code INT NOT NULL,
PRIMARY KEY (Inspection_ID, ProSer_ID),
FOREIGN KEY (ProSer_ID) REFERENCES ProSer(ProSer_ID),
FOREIGN KEY (Code) REFERENCES Factor(Code)
);

CREATE TABLE N_Lab
(
  Lab_Name VARCHAR(50) NOT NULL,
  Lab_ID INT NOT NULL,
  Code INT NOT NULL,
  PRIMARY KEY (Lab_ID),
  FOREIGN KEY (Code) REFERENCES Factor(Code)
);

CREATE TABLE Treatment
(
  Treatment_INFO VARCHAR(50) NOT NULL,
  Treatment_DATE DATE NOT NULL,
  Treatment_ID INT NOT NULL,
  Lab_ID INT NOT NULL,
  Code INT NOT NULL,
  PRIMARY KEY (Treatment_ID, Lab_ID),
  FOREIGN KEY (Lab_ID) REFERENCES N_Lab(Lab_ID),
  FOREIGN KEY (Code) REFERENCES Main_action(Code)
);

CREATE TABLE List_ProSer
(
  ListProSer_ID INT NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  amount INT NOT NULL,
  Code INT NOT NULL,
  ProSer_ID INT NOT NULL,
  PRIMARY KEY (ListProSer_ID, Code),
  FOREIGN KEY (Code) REFERENCES Main_action(Code),
  FOREIGN KEY (ProSer_ID) REFERENCES ProSer(ProSer_ID)
);

CREATE TABLE package_detail
(
  package_ID INT NOT NULL,
  package_Name VARCHAR(50) NOT NULL,
  ProSer_ID INT NOT NULL,
  beProSer_ID INT NOT NULL,
  PRIMARY KEY (package_ID, ProSer_ID),
  FOREIGN KEY (ProSer_ID) REFERENCES ProSer(ProSer_ID),
  FOREIGN KEY (beProSer_ID) REFERENCES ProSer(ProSer_ID)
);