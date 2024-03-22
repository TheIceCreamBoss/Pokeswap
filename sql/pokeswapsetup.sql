#!DB INIT!
CREATE DATABASE pokeswap;
USE pokeswap;


#!TABLE INIT!
#users~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
CREATE TABLE `user` (
	user_id int PRIMARY KEY,
email varchar(254) UNIQUE NOT NULL,
name varchar(50), 
phone_num char(10), 
profile_visibility bit NOT NULL DEFAULT 1
);

#userrating~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
CREATE TABLE ratingsRates (
	rate_id int PRIMARY KEY,
	star_count int NOT NULL,
	description varchar(200),
	rate_author_id int NOT NULL,
	rate_recipient_id int NOT NULL,
	rate_date date NOT NULL,
	FOREIGN KEY (rate_author_id) REFERENCES user(user_id) ON DELETE CASCADE,
FOREIGN KEY (rate_recipient_id) REFERENCES user(user_id) ON DELETE CASCADE,
UNIQUE (rate_author_id, rate_recipient_id)
);


#post creation~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
CREATE TABLE postCreates (
	post_id int PRIMARY KEY,
	image_link varchar(200),
content varchar(200) NOT NULL,
	post_date date NOT NULL,
user_id int NOT NULL,
FOREIGN KEY (user_id) REFERENCES `user`(user_id) ON DELETE CASCADE
);
CREATE TABLE commentsWritesBelongsTo (
	post_id int,
	comment_id int,
	user_id int NOT NULL,
	content varchar(200) NOT NULL,
	comment_date date NOT NULL,
	PRIMARY KEY (post_id, comment_id),
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
	card_id int PRIMARY KEY,
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
	trade_id int PRIMARY KEY,
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






