#!DB INIT!
DROP DATABASE pokeswap ; 
CREATE DATABASE pokeswap;
USE pokeswap;


#!TABLE INIT!
#users~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
CREATE TABLE `user` (
  user_id int PRIMARY KEY AUTO_INCREMENT,
  email varchar(254) UNIQUE NOT NULL,
  name varchar(50), 
  phone_num char(10), 
  profile_visibility bit NOT NULL DEFAULT 1,
  CONSTRAINT `chk_email_format` CHECK (email REGEXP '^.+@.+\\..+$'),
  CONSTRAINT `chk_phone_length` CHECK (CHAR_LENGTH(phone_num) = 0 OR CHAR_LENGTH(phone_num) = 10 AND phone_num REGEXP '^[0-9]+$')
);

#userrating~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
CREATE TABLE ratingsRates (
	rate_id int PRIMARY KEY AUTO_INCREMENT,
	star_count int NOT NULL,
	description varchar(200),
	rate_author_id int NOT NULL,
	rate_recipient_id int NOT NULL,
	rate_date date NOT NULL,
	FOREIGN KEY (rate_author_id) REFERENCES user(user_id) ON DELETE CASCADE,
FOREIGN KEY (rate_recipient_id) REFERENCES user(user_id) ON DELETE CASCADE,
UNIQUE (rate_author_id, rate_recipient_id),
CONSTRAINT `chk_star_max` CHECK (star_count BETWEEN 1 AND 5)
);


#post creation~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
CREATE TABLE postCreates (
	post_id int PRIMARY KEY AUTO_INCREMENT,
	image_link varchar(200),
content varchar(200) NOT NULL,
	post_date date NOT NULL,
user_id int NOT NULL,
FOREIGN KEY (user_id) REFERENCES `user`(user_id) ON DELETE CASCADE
);

CREATE TABLE commentsWritesBelongsTo (
    comment_id int AUTO_INCREMENT,
    post_id int NOT NULL,
    user_id int NOT NULL,
    content varchar(200) NOT NULL,
    comment_date date NOT NULL,
    PRIMARY KEY (comment_id),
    FOREIGN KEY (post_id) REFERENCES postCreates(post_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES `user`(user_id) ON DELETE CASCADE
);


#card creation/definitons~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
CREATE TABLE verifiedRatings(
	psa_rating int PRIMARY KEY,
	verified bit
);

CREATE TABLE cardType(
	info_id varchar(20),
	collection varchar(20),
PRIMARY KEY (info_id, collection)
);

CREATE TABLE pokemonTypes(
	pokemon varchar(20) PRIMARY KEY,
`type` varchar(20) NOT NULL
);

CREATE TABLE pokemonCard(
	info_id varchar(20),
	collection varchar(20),
	pokemon varchar(20) NOT NULL,
	card_description varchar(200) NOT NULL,
	hp int NOT NULL,
	gxcard bit NOT NULL,
PRIMARY KEY (info_id, collection),
FOREIGN KEY (info_id, collection) REFERENCES cardType(info_id, collection),
FOREIGN KEY (pokemon) REFERENCES pokemonTypes(pokemon)
);

CREATE TABLE energyCardDescriptions(
	`type` varchar(20) PRIMARY KEY,
card_description varchar(500)
);
CREATE TABLE energyCard(
	info_id varchar(20),
	collection varchar(20),
	type varchar(20) NOT NULL,
PRIMARY KEY (info_id, collection),
FOREIGN KEY (info_id, collection) REFERENCES cardType(info_id, collection),
FOREIGN KEY (`type`) REFERENCES energyCardDescriptions(`type`)
);

CREATE TABLE trainerCardDescriptions(
	trainer varchar(20) PRIMARY KEY,
card_description varchar(1000) NOT NULL
);
CREATE TABLE trainerCard(
	info_id varchar(20),
	collection varchar(20),
	trainer varchar(20) NOT NULL,
PRIMARY KEY (info_id, collection),
FOREIGN KEY (info_id, collection) REFERENCES cardType(info_id, collection),
FOREIGN KEY (trainer) REFERENCES trainerCardDescriptions(trainer)
);

CREATE TABLE cardOwnsDescribedAs(
	card_id int PRIMARY KEY AUTO_INCREMENT,
	psa_rating int,
	date_uploaded date NOT NULL,
	user_id int,
	date_aquired date NOT NULL,
	info_id varchar(20) NOT NULL,
	collection varchar(20) NOT NULL,
FOREIGN KEY (user_id) REFERENCES `user`(user_id) ON DELETE SET NULL,
FOREIGN KEY (info_id, collection) REFERENCES cardType(info_id, collection),
FOREIGN KEY (psa_rating) REFERENCES verifiedRatings(psa_rating)
);

#trades~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
CREATE TABLE tradeOfferTradesWith(
	trade_id int PRIMARY KEY AUTO_INCREMENT,
	trade_date date NOT NULL,
	trade_author_id int NOT NULL,
	trade_recipient_id int NOT NULL,
	FOREIGN KEY (trade_author_id) REFERENCES `user`(user_id) ON DELETE CASCADE,
FOREIGN KEY (trade_recipient_id) REFERENCES `user`(user_id) ON DELETE CASCADE
);
CREATE TABLE includedCards(
	trade_id int,
	card_id int,
	PRIMARY KEY (trade_id, card_id),
	FOREIGN KEY (trade_id) REFERENCES tradeOfferTradesWith(trade_id) ON DELETE CASCADE,
	FOREIGN KEY (card_id) REFERENCES cardOwnsDescribedAs(card_id) ON DELETE CASCADE
);

#!TABLE POPULATION!


#users~~~~~~~~~~~~~~~~~
INSERT INTO user (email, name, phone_num, profile_visibility) VALUES
('erik.lin@gmail.com', 'Erik Lin','2501112222', 1),
('nich.zhang@gmail.com', 'Nechael Zhang','7783334444', 1),
('jay.park@gmail.com', 'Jay Park', '7782222222', 0),
('jamie.kim@gmail.com', 'Jamie Kim', NULL, 1),
('anon@gmail.com', NULL, NULL, 1),
('joe.jim@gmail.com', 'pokemonlover3000', NULL, 1),
('abc.def@hotmail.com', 'abc', NULL, 1),
('andre.wen@andre.com', 'andre', '2501111111', 0);
#8 tuples

#ratings~~~~~~~~~~~~~~~~
INSERT INTO ratingsRates (star_count, description, rate_author_id, rate_recipient_id, rate_date) VALUES
(3, 'Fine', 1, 2, '2024-01-11'),
(1, 'Scammed me', 1, 4, '2023-08-25'),
(2, NULL, 1, 6, '2024-02-09'),
(4, 'Fast and Friendly', 1, 8, '2023-11-01'),
(5, 'No complaints', 2, 1, '2023-12-16'),
(3, 'Okay experience', 2, 3, '2023-12-02'),
(3, NULL, 2, 5, '2023-04-22'),
(5, 'Threw in a free gift :D', 2, 7, '2023-08-01'),
(1, 'Card arrived damaged', 3, 2, '2023-04-20'),
(2, 'Rude and misleading', 3, 4, '2023-05-04'),
(4, 'Decent experience', 3, 6, '2023-08-02'),
(3, 'Okay', 3, 8, '2024-02-29'),
(1, NULL, 4, 1, '2023-08-30'),
(5, ':D', 4, 3, '2023-06-15'),
(1, 'boo', 4, 5, '2023-09-10'),
(2, 'meh', 4, 7, '2023-10-05'),
(4, 'zzz', 5, 2, '2023-04-03'),
(5, 'good customer service', 5, 4, '2023-05-20'),
(3, 'bleh', 5, 6, '2023-07-25'),
(2, 'bad', 5, 8, '2023-12-31'),
(4, 'good experience', 6, 1, '2023-04-07'),
(3, 'sorta slow', 6, 3, '2024-01-25'),
(2, 'bad', 6, 5, '2024-03-28'),
(4, 'great', 6, 7, '2024-03-13'),
(2, 'bad', 7, 2, '2023-12-03'),
(2, 'mean', 7, 4, '2023-12-24'),
(3, 'mediocre', 7, 6, '2023-10-21'),
(4, 'good condition', 7, 8, '2023-08-25'),
(5, NULL, 8, 1, '2024-02-29'),
(1, NULL, 8, 3, '2023-04-13'),
(2, NULL, 8, 5, '2023-11-18'),
(3, NULL, 8, 7, '2023-11-22');

#postCreation~~~~~~~~~~~~~~~~~~~~
INSERT INTO postCreates (post_id, image_link, content, post_date, user_id) VALUES
(1, 'http://pokeswap.com/images/pikachu.jpg', 'Look at this cute pikachu!', '2024-02-28', 1),
(2, NULL, 'Are the new holographic cards worth it?', '2024-02-27', 1),
(3, 'http://pokeswap.com/images/charizard.jpg', 'Charizard’s card design over the years', '2024-02-26', 2),
(4, 'http://pokeswap.com/images/greninja.jpg', 'Check this Greninja out.', '2024-02-25', 3),
(5, 'http://pokeswap.com/images/mewtwo.jpg', 'Mewtwo EX’s design is possibly flawed!?', '2024-02-24', 4);

INSERT INTO commentsWritesBelongsTo (post_id, user_id, content, comment_date) VALUES
(1, 1, 'Such a cool card!', '2024-02-28'),
(2, 1, 'I think this is a fake!', '2024-02-27'),
(3, 2, 'Did you get scammed?', '2024-02-26'),
(4, 3, 'I completely agree.', '2024-02-25'),
(4, 4, 'I disagree with your opinion...', '2024-02-24');

#card creation/definitons~~~~~~~~~~~~~~~~~~~~~~~~
INSERT INTO verifiedRatings (psa_rating, verified) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(7, 1),
(8, 1),
(9, 1),
(10, 1);



INSERT INTO cardType (info_id, collection) VALUES
(1, 'BS'),
(2, 'BS'),
(3, 'BS'),
(4, 'BS'),
(5, 'BS'),
(6, 'BS'),
(7, 'BS'),
(8, 'BS'),
(9, 'BS'),
(10, 'BS'),
(100, 'BS'),
(102, 'BS'),
(140, 'KSS'),
('178','CES'),
('181','ASR'),
('124','CRZ'),
('102','G2'),
('91','FLF'),
('42','XY'),
('239','CEC'),
('154','UNB'),
('22','AOR'),
('92','GRI'),
(95, 'EXD'),
(3, 'XY'),
(95, 'EXTRR');

INSERT INTO pokemonTypes (pokemon, type) VALUES
('pikachu','lightning'),
('sylveon','fairy'),
('vaporeon','water'),
('piplup','water'),
('porygon','normal'),
('alakazam', 'psychic'),
('blastoise','water'),
('chansey','colorless'),
('charizard','fire'),
('clefairy','colorless'),
('gyarados','water'),
('hitmonchan','fighting'),
('machamp','fighting'),
('magneton','lightning'),
('mewtwo','psychic'),
('weedle','grass');


INSERT INTO pokemonCard (info_id, collection, pokemon, card_description, hp, gxcard) VALUES
('42','XY','pikachu','Nuzzle',60,0),
('239','CEC','piplup','Bubble Hold',60,0),
('154','UNB','porygon','Digicharge',50,0),
('22','AOR','vaporeon','Aqua Effect',90,0),
('92','GRI','sylveon','Magical Ribbon',200,1),
('1','BS','alakazam','Confuse Ray','80',0),
('2','BS','blastoise','Hydro Pump','100',0),
('3','BS','chansey','Double-edge','120',0),
('4','BS','charizard','Fire Spin','120',0),
('5','BS','clefairy','Sing','40',0),
('6','BS','gyarados','Bubblebeam','100',0),
('7','BS','hitmonchan','Special Punch','70',0),
('8','BS','machamp','Seismic Toss','100',0),
('9','BS','magneton','Selfdestruct','60',0),
('10','BS','mewtwo','Barrier','60',0);


INSERT INTO energyCardDescriptions (`type`, card_description) VALUES
('lightning', NULL),
('fairy', NULL),
('scramble_energy', 'Scramble Energy can be attached only to an Evolved Pokémon (excluding Pokémon-ex). Scramble Energy  provides   Colorless Energy.  While in play, if you have more Prize cards left than your opponent, Scramble Energy provides every  type of Energy but provides only 3 in any combination at a time. If the Pokémon Scramble Energy is  attached to isn’t an Evolved Pokémon (or evolves into Pokémon-ex), discard Scramble Energy.'),
('water', NULL),
('r_energy', 'R Energy can be attached only to a Pokémon that has Dark or Rocket\'s in its name. While in play, R Energy provides 2 Darkness Energy. (Doesn\'t count as a basic Energy card.) If the Pokémon R Energy is attached to attacks, the attack does 10 more damage to the Active Pokémon (before applying Weakness and Resistance). When your turn ends, discard R Energy.');


INSERT INTO energyCard (info_id, collection, `type`) VALUES
(102, 'BS', 'water'),
(95, 'EXD', 'scramble_energy'),
(95, 'EXTRR', 'r_energy'),
(100, 'BS', 'lightning'),
(140, 'KSS', 'fairy');



INSERT INTO trainerCardDescriptions (trainer, card_description) VALUES
('acro_bike','Look at the top 2 cards of your deck and put 1 of them into your hand. Discard the other card.'),
('adaman','You can use this card only if you discard 2 Metal Energy cards from your hand. Search your deck for up to 2 cards and put them into your hand. Then, shuffle your deck.'),
('bede','Attach a basic Energy card from your hand to 1 of your Benched Pokémon.'),
('chaos_gym','This card stays in play after being played. Discard this card if another Stadium card comes into play.
Whenever a player plays a Trainer card other than a Stadium card, he or she flips a coin. If heads, that player plays that card normally. If tails, the player can\'t play that card. If the card isn\'t put into play, the player\'s opponent may use that card instead, if he or she does everything required in order to play that card (like discarding cards). Either way, the card goes to its owner\'s discard pile.
'),
('magenetic_storm','Each Pokémon in play has no Resistance.');


INSERT INTO trainerCard (info_id, collection, trainer) VALUES
('178','CES', 'acro_bike'),
('181','ASR', 'adaman'),
('124','CRZ', 'bede'),
('102','G2', 'chaos_gym'),
('91','FLF', 'magenetic_storm');

INSERT INTO cardOwnsDescribedAs (psa_rating, date_uploaded, user_id, date_aquired, info_id, collection) VALUES
(9, '2024-03-01', 1, '2024-02-01', 1, 'BS'),
(8, '2024-03-01', 1, '2024-02-01', 2, 'BS'),
(6, '2024-03-01', 1, '2024-02-01', 3, 'BS'),
(7, '2024-03-01', 1, '2024-02-01', 4, 'BS'),
(4, '2024-03-01', 1, '2024-02-01', 5, 'BS'),
(NULL, '2024-03-01', 1, '2024-02-01', 6, 'BS'),
(8, '2024-03-01', 1, '2024-02-01', 7, 'BS'),
(6, '2024-03-01', 1, '2024-02-01', 8, 'BS'),
(NULL, '2024-03-01', 1, '2024-02-01', 9, 'BS'),
(7, '2024-03-01', 1, '2024-02-01', 10, 'BS'),
#^10
(10, '2024-03-01', 1, '2024-02-01', 100, 'BS'),
(4, '2024-03-01', 1, '2024-02-01', 102, 'BS'),
(9, '2024-03-02', 2, '2024-02-02', 4, 'BS'),
(NULL, '2024-03-03', 1, '2024-02-03', 2, 'BS'),
(10, '2024-03-04', 2, '2024-02-04', 178, 'CES'),
(NULL, '2024-03-05', NULL, '2024-02-05', 140, 'KSS'),
(9, '2024-03-01', 5, '2024-02-01', 181, 'ASR'),
(8, '2024-03-02', 6, '2024-02-02', 4, 'BS'),
(NULL, '2024-03-03', 2, '2024-02-03', 154, 'UNB'),
(10, '2024-03-04', 4, '2024-02-04', 3, 'BS'),
#^20
(NULL, '2024-03-05', 3, '2024-02-05', 42, 'XY'),
(NULL, '2024-03-05', 1, '2024-02-05', 42, 'XY'),
(8, '2024-03-05', 3, '2024-02-05', 3, 'XY');



#trades~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

INSERT INTO tradeOfferTradesWith (trade_id, trade_date, trade_author_id, trade_recipient_id) VALUES
(1, '2024-02-28', 1, 2),
(2, '2024-02-27', 3, 4),
(3, '2024-02-26', 5, 2),
(4, '2024-02-25', 3, 1),
(5, '2024-02-24', 5, 4);


INSERT INTO includedCards (trade_id, card_id) VALUES
(1, 1),
(1, 2),
(1, 4),
(1, 6),
(1, 13),
(1, 19),
(2, 20),
(2, 21),
(3, 17),
(3, 15),
(4, 11),
(5, 17);
