-- 
-- EC-TEAM V1.3
-- 

DROP DATABASE IF EXISTS EC_TEAM;

CREATE DATABASE IF NOT EXISTS EC_TEAM CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE EC_TEAM;




CREATE TABLE IF NOT EXISTS TEAM(
	ID VARCHAR(36) PRIMARY KEY,
	NAME VARCHAR(100) NOT NULL,
	SYMBOL VARCHAR(20),
	FAX VARCHAR(10),
	NAME_OF_AUTHORIZED_MEMBER VARCHAR(100),
	ADDRESS_OF_AUTHORIZED_MEMBER VARCHAR(300),
	CREATED_DATE BIGINT,
	UPDATED_DATE BIGINT
)ENGINE=INNODB;


INSERT INTO TEAM VALUES 
('5eedb70e-a4da-48e0-b971-e06cd19ecc70','Ahila Ilankai Thamil Congress','Bicycle','0112586254','Mr G.G Ponnambalam','\"Congress House\", No 120,Main street,Jaffna', 1545384181, 1545384181),
('62fcdfa7-3c5a-405f-b344-79089131dd8e','United National Freedom Front','Comb of Plantains','0112695069','Mr. Maithree Gunarathne','118,Barnes Place,Colombo 07', 1545384181, 1545384181),
('811af1b3-ea50-4879-905d-b9df00a6ed1d','United national Party','Elephant','0112865374','Mr. Akila Viraj Viraj Kariyawasam','\"Srikotha\" 400,kotte Road, Pitakotte', 1545384181, 1545384181),
('12','United Democratic Front','Rabbit',NULL,NULL,NULL, 1545384181, 1545384181),
('13','Democratic Unity Alliance','Two Leaves','0112672322','Mr. Z.M Hithayathulla','107,Railway Avenue ,Kirullapone,Colombo 05', 1545384181, 1545384181),
('14','United People\'s party ','Mobile Phone','0112695047','Mr. D.M.D.J Gunawardhana','A/3/4, Manning Town Flats,Matha Road,Colombo 08', 1545384181, 1545384181),
('15','EksathLanka Podujana Pakshaya','Cup',NULL,NULL,NULL, 1545384181, 1545384181),
('16','Eksath Lanka Maha Saba Party','Cobra','0112244609','Mr. jayantha Kulathunga','203/10,Layard Broadway ,Colombo 14', 1545384181, 1545384181),
('17','United Left Front','Canoe','0112885394','Mr. Lal Wijenayake','1003-1/1,Sri jayawardenapura Road,Rajagiriya', 1545384181, 1545384181),
('18','Uniited Socialist Party','Tri-shaw',NULL,'Mr. Siritunga Jayasuriya','53/6, E D Dabare Mawatha,Narahenpita Colombo 05', 1545384181, 1545384181),
('19','United Peace Alliance','Butterfly',NULL,'Mr M.T Hasan Ali','30,Beach Road, Mt Lavinia', 1545384181, 1545384181),
('2','Akhila Ilankai Tamil Mahasabha','Ship','0262053755','Mr. Thambiyappa Goopalakrishnan','No 23 4/2, Seagul Queen Court,Arethusha Lane', 1545384181, 1545384181),
('3','Our National Frnt','Telephone','0112874177','Mrs. Vishaka Rajakumari Paragasthenna','347/A,Kotte Road,Mirihana,Nugegoda', 1545384181, 1545384181),
('4','All Cyelon Makkal Congress','Peacock','0112622897','Mr. S. Subairdeen','no 27,Vauxhall Street,Colombo 02', 1545384181, 1545384181),
('5','Ilankai Tamil Arassu Kadchi','House','0212215731','Mr. K Thurairasasingham','30,Martin Road,Jaffna', 1545384181, 1545384181),
('6','Eelavar Democratic Front','Plough',NULL,NULL,NULL, 1545384181, 1545384181),
('7','Eelam People\'s Democratic Party','Veena','0112585255','Mr. Douglas Devananda','9/3, Station Road,Bambalapitiya,colombo 04', 1545384181, 1545384181),
('8','Eelam People\'s Revolutionary Liberation Front','Flower','0242221898','Mr. N Sivasakthi','26/10,First Lane , Kandy Road, Vavuniya', 1545384181, 1545384181),
('9','United People\'s Freedom Alliance','Betel Leaf','0112680187','Mr. Mahinda Amaraweera','301,T.B Jayah Mawatha, Colombo 07', 1545384181, 1545384181);






CREATE TABLE IF NOT EXISTS CONTACT_NUMBER(
	ID VARCHAR(36) PRIMARY KEY,
	TEAM_ID VARCHAR(36) NOT NULL,
	CONTACT_NO VARCHAR(15),
	
	FOREIGN KEY(TEAM_ID) REFERENCES TEAM(ID) ON UPDATE CASCADE ON DELETE RESTRICT
)ENGINE=INNODB;


INSERT INTO CONTACT_NUMBER VALUES 
('5165907c-0b3d-4054-8240-f5993055ec5f','5eedb70e-a4da-48e0-b971-e06cd19ecc70','0777301021'),
('0c655d33-6dc5-41a0-9724-d9c2fba10484','5eedb70e-a4da-48e0-b971-e06cd19ecc70','0112581677'),
('6303ff65-3f87-4dc4-a62f-9f885796e7d9','5eedb70e-a4da-48e0-b971-e06cd19ecc70','0212223739'),
('ccadbadb-727a-4406-b3d1-1ac96367cbe8','5eedb70e-a4da-48e0-b971-e06cd19ecc70','0112586232'),
('01a89e63-b278-45d5-98c4-4981c2b45024','3','0112827368'),
('acb1022a-1fa0-44e4-9180-b91e2da481ac','7','0777781891'),
('2840a5d3-c725-44eb-8e8e-98e539f938ef','7','0112593515'),
('13','7','0112503467'),
('14','7','0212229824'),
('15','5','0212228776'),
('16','4','011273796'),
('17','4','0777315329'),
('18','4','0112372848'),
('19','4','0777739392'),
('20','8','0714347480'),
('21','8','0242221898'),
('22','8','0242227680'),
('23','9','0777730071'),
('24','9','0112686070'),
('25','62fcdfa7-3c5a-405f-b344-79089131dd8e','0777900000'),
('26','62fcdfa7-3c5a-405f-b344-79089131dd8e','0112695069'),
('27','62fcdfa7-3c5a-405f-b344-79089131dd8e','0777787107'),
('28','62fcdfa7-3c5a-405f-b344-79089131dd8e','0773525526'),
('29','811af1b3-ea50-4879-905d-b9df00a6ed1d','0777777703'),
('30','811af1b3-ea50-4879-905d-b9df00a6ed1d','0112865374'),
('31','811af1b3-ea50-4879-905d-b9df00a6ed1d','0112865375'),
('32','811af1b3-ea50-4879-905d-b9df00a6ed1d','0777485591'),
('5','2','0759062091'),
('6','2','0777062091'),
('7','2','0112364235'),
('8','3','0112874177'),
('9','3','0773161616');


