-- script สำหรับสร้างก้อน table ที่เราจะใช้

CREATE TABLE Student (
    student_id int auto_increment primary key,
    name varchar(255),
    last_name varchar(255)
);

CREATE TABLE Subject (
    subject_id int auto_increment primary key,
    subject_name varchar(255),
    teacher_name varchar(255)
);

CREATE TABLE Score (
    id int auto_increment primary key,
    student_id int,
    subject_id int,
    score double,
    CONSTRAINT FK_score FOREIGN KEY (student_id)
    REFERENCES Student(student_id),
    CONSTRAINT FK_subject FOREIGN KEY (subject_id)
    REFERENCES Subject(subject_id)
);

-- พวกนี้ไม่ต้อง copy ไปทำ อะไร แค่ให้ดู การทำงานเฉยๆ
select * from Student;

SELECT * from Student,Subject,Score;

INSERT into Student values (null, "zoro", "Goblan");

INSERT into Subject values (null, "DB", "teachC");

INSERT into Score values (null,2, 2, 30)

DELETE FROM Student WHERE student_id = 4;

UPDATE Student
SET name = "Bleach", last_name = "Hollow"
WHERE student_id  = 2;

SELECT st.student_id,name,last_name,sj.subject_name,sc.score 
                    FROM Student st 
                    INNER JOIN Score sc   on sc.student_id = st.student_id
                    INNER JOIN Subject sj on sc.subject_id = sj.subject_id