INSERT INTO public.bar (id, name, address, latitude, longitude, rate, opening_hours, created_at, updated_at, city_id)
VALUES
  (1, 'O Collins Irish Pub', '34 Cr Jean Jaurès, 84000 Avignon', 43.9445, 4.80535, 4.4, 'Monday: 8:00 AM - 1:00 AM,\r\nTuesday: 8:00 AM - 1:00 AM,\r\nWednesday: 8:00 AM - 1:00 AM,\r\nThursday: 8:00 AM - 1:00 AM,\r\nFriday: 8:00 AM - 1:00 AM,\r\nSaturday: 8:00 AM - 1:00 AM,\r\nSunday: 3:00 PM - 1:00 AM', '2025-01-31 10:22:10.218085', '2025-01-31 10:22:10.218085', 881),
  (2, 'The Pipeline', '34 Cr Jean Jaurès, 84000 Avignon', 43.9451, 4.8054, 4.4, 'Monday: 9:00 AM - 0:00 AM,\r\nTuesday: 9:00 AM - 0:00 AM,\r\nWednesday: 9:00 AM - 0:00 AM,\r\nThursday: 9:00 AM - 0:00 AM,\r\nFriday: 9:00 AM - 0:00 AM,\r\nSaturday: 9:00 AM - 0:00 AM,\r\nSunday: 6:30 PM - 11:30 PM', '2025-01-31 10:22:10.218085', '2025-01-31 10:22:10.218085', 881);


COPY public.bar_city (id, bar_id, city_id) FROM stdin;
6	1	881
7	2	881
\.


--
-- Data for Name: bar_image; Type: TABLE DATA; Schema: public; Owner: beehunter_bdd_user
--

COPY public.bar_image (id, bar_id, image_link, created_at, updated_at) FROM stdin;
6	1	\\assets\\images\\bar-images\\ocollins-pub-avignon.png	2025-01-31 10:25:04.569394	2025-01-31 10:25:04.569394
\.


--
-- Data for Name: beer; Type: TABLE DATA; Schema: public; Owner: beehunter_bdd_user
--

COPY public.beer (id, name, subtitle, alcool_degree, description, image_link, beer_type_id, created_at, updated_at) FROM stdin;
8	Heineken	Bière rafraichissante	5	Bière blonde néerlandaise, légère et rafraîchissante, avec une saveur légèrement fruitée et une amertume modérée.	/assets/images/beer/heineken-carre.webp	1	2025-01-31 14:01:54.048416	2025-01-31 14:01:54.048416
9	Guiness	Bière riche, avec des notes de café, de chocolat et de malt grillé	4.2	La Guinness est l''une des stouts les plus reconnues au monde, souvent servie en pression dans les pubs et appréciée pour sa texture et son goût unique. Elle est également la bière la plus consommée en Irlande et est devenue un symbole international de la culture irlandaise. La Guinness est riche, avec des notes de café, de chocolat et de malt grillé, créant une saveur légèrement amère mais bien équilibrée. Elle a un goût rond et doux, avec une finale légèrement sucrée. La bière est également connue pour son crémeux et sa texture veloutée, en grande partie grâce à son procédé de fabrication particulier.	/assets/images/beer/guiness-carre.webp	7	2025-01-31 14:03:45.680758	2025-01-31 14:03:45.680758
10	Chouffe	Bière très appréciée pour sa complexité, son équilibre et son côté aromatique.	8	La Chouffe est une bière fruitée, épicée et légèrement sucrée, avec des arômes de banane, de mangue et de coriandre. Elle possède également des notes maltées qui lui donnent un aspect sucré et un arrière-goût légèrement amer, mais équilibré par sa douceur. Sa carbonatation est généreuse, apportant une texture pétillante et agréable.	/assets/images/beer/chouffe-carre.webp	11	2025-01-31 14:04:05.08023	2025-01-31 14:04:05.08023
11	Chimay	Chimay blanche	4.5	Bière d'abbaye belge blanche	/assets/images/beer/chimay-carre.webp	3	2025-01-31 14:05:03.171059	2025-01-31 14:05:03.171059
12	Pelforth	Bière française	5	Bière brune française	/assets/images/beer/pelforth-carre.webp	2	2025-01-31 14:05:11.289174	2025-01-31 14:05:11.289174
13	Pelforth	Bière française	5.8	Bière Blonde française	/assets/images/beer/pelforth-carre.webp	1	2025-01-31 14:05:19.859161	2025-01-31 14:05:19.859161
14	Eku Kulminator	Bière hors du commun de part son degré d'alcool	28	Bière allemande brune	/assets/images/beer/eku-carre.webp	2	2025-01-31 14:05:33.88603	2025-01-31 14:05:33.88603
15	1664	Bière Blonde désaltérante	5.5	Bière française emblématique, la 1664 est appréciée pour sa fraîcheur et son caractère désaltérant.	/assets/images/beer/1664-carre.webp	1	2025-01-31 14:05:42.312036	2025-01-31 14:05:42.312036
16	Leffe	Bière belge	6.6	Bière d'abbaye belge, la Leffe Blonde est une bière de dégustation, avec des arômes fruités et épicés, et une légère amertume.	/assets/images/beer/leffe-carre.webp	1	2025-01-31 14:05:51.513639	2025-01-31 14:05:51.513639
17	Kronenbourg	Bière française	5.5	Bière blonde française, brassée avec du houblon Strisselspalt, offrant des notes fruitées et une amertume délicate.	/assets/images/beer/kronenbourg-carre.webp	1	2025-01-31 14:06:00.266377	2025-01-31 14:06:00.266377
18	Desperados	Bière aromatisée	5.9	Bière aromatisée à la tequila, avec des notes d''agrumes et une douceur sucrée, offrant une expérience unique.	/assets/images/beer/desperados-carre.webp	10	2025-01-31 14:06:09.699406	2025-01-31 14:06:09.699406
19	Grimbergen	Bière d'abbaye	6.7	Bière d'abbaye belge, la Grimbergen Blonde est légèrement fruitée, offrant un bel équilibre entre douceur et amertume.	/assets/images/beer/grimbergen-carre.webp	1	2025-01-31 14:06:15.001192	2025-01-31 14:06:15.001192
20	Stella Artois	Bière belge	5	Bière blonde belge, avec un goût équilibré, une légère amertume et une finale sèche.	/assets/images/beer/stella-carre.webp	1	2025-01-31 14:06:24.077823	2025-01-31 14:06:24.077823
21	Affligem	Bière d''abbaye belge	6.7	Bière d''abbaye belge, avec des arômes fruités, une saveur douce et maltée, et une légère amertume en finale.	/assets/images/beer/affligem-carre.webp	1	2025-01-31 14:06:30.380273	2025-01-31 14:06:30.380273
\.


--
-- Data for Name: beer_available; Type: TABLE DATA; Schema: public; Owner: beehunter_bdd_user
--

COPY public.beer_available (id, bar_id, beer_id) FROM stdin;
\.


--
-- Data for Name: beer_type; Type: TABLE DATA; Schema: public; Owner: beehunter_bdd_user
--

COPY public.beer_type (id, name, created_at, updated_at, description) FROM stdin;
1	Blonde	2025-01-28 13:01:40.006849	2025-01-28 13:01:40.006849	Une bière légère et rafraîchissante, souvent de type lager, avec un goût subtil de houblon.
2	Brune	2025-01-28 13:01:40.006849	2025-01-28 13:01:40.006849	Une bière plus foncée, avec des notes de caramel, de chocolat ou de café, souvent plus riche et plus douce.
3	Blanche	2025-01-28 13:01:40.006849	2025-01-28 13:01:40.006849	Une bière légère, souvent épicée avec de la coriandre et de l'écorce d'orange.
5	Ambrée	2025-01-28 13:01:40.006849	2025-01-28 13:01:40.006849	Une bière au goût malté, légèrement sucré et caramélisé, avec une couleur rougeâtre ou ambrée.
4	IPA (India Pale Ale)	2025-01-28 13:01:40.006849	2025-01-28 13:01:40.006849	Une bière houblonnée et amère, souvent avec des arômes fruités et floraux.
6	Pilsner	2025-01-31 11:00:42.875314	2025-01-31 11:00:42.875314	Une lager légère et croquante, souvent un peu amère, d'origine tchèque.
7	Stout	2025-01-31 11:00:42.875314	2025-01-31 11:00:42.875314	Une bière noire, riche et crémeuse, souvent avec des arômes de café ou de chocolat.
8	Porter	2025-01-31 11:00:42.875314	2025-01-31 11:00:42.875314	Une bière sombre, similaire à la stout mais avec des arômes plus doux, souvent de caramel.
9	Pale Ale	2025-01-31 11:00:42.875314	2025-01-31 11:00:42.875314	Bière originaire d'Angleterre, qui se caractérise par un goût équilibré entre le malt et le houblon, avec une couleur qui peut varier du doré pâle à l'ambré clair.
10	Lager	2025-01-31 11:05:06.355911	2025-01-31 11:05:06.355911	Les lagers ont généralement un goût léger, net et équilibré, avec des saveurs maltées qui peuvent être légèrement sucrées ou biscuitées. Elles sont souvent moins amères que les bières comme les IPA (India Pale Ale).
11	Belgian Strong Ale	2025-01-31 12:03:19.649968	2025-01-31 12:03:19.649968	Le Belgian Strong Ale est un style de bière originaire de Belgique, réputé pour sa forte teneur en alcool et ses saveurs riches et complexes. Ces bières sont souvent mûries pendant un certain temps, ce qui permet aux saveurs de se développer et de s’équilibrer. Elles peuvent être un peu sucrées et assez chaudes en raison de la forte teneur en alcool.
\.


COPY public.comment_image (id, image_link, user_comment_id, created_at, updated_at) FROM stdin;
1	/assets/images/comment1.png	1	2025-01-28 13:01:40.006849	2025-01-28 13:01:40.006849
2	/assets/images/comment2.png	2	2025-01-28 13:01:40.006849	2025-01-28 13:01:40.006849
3	/assets/images/comment3.png	3	2025-01-28 13:01:40.006849	2025-01-28 13:01:40.006849
4	/assets/images/comment4.png	4	2025-01-28 13:01:40.006849	2025-01-28 13:01:40.006849
5	/assets/images/comment5.png	5	2025-01-28 13:01:40.006849	2025-01-28 13:01:40.006849
\.

COPY public.favorite_bar (id, user_id, bar_id) FROM stdin;
\.

COPY public.user_comment (id, text, rate, comment_image_id, user_id, bar_id, created_at, updated_at) FROM stdin;
3	Ambiance sympa mais trop bruyant	4	\N	3	3	2025-01-28 13:01:40.006849	2025-01-28 13:01:40.006849
4	Bière excellente mais prix un peu ‚lev‚	4	\N	4	4	2025-01-28 13:01:40.006849	2025-01-28 13:01:40.006849
5	Ambiance chaleureuse, très bon moment	5	\N	5	5	2025-01-28 13:01:40.006849	2025-01-28 13:01:40.006849
6	test comment	5	1	1	1	2025-01-28 14:03:04.470038	2025-01-28 14:03:04.470038
7	test comment	5	1	1	1	2025-01-28 14:03:43.243611	2025-01-28 14:03:43.243611
8	test comment	5	1	1	1	2025-01-28 14:03:50.981507	2025-01-28 14:03:50.981507
9	test comment	5	1	1	1	2025-01-28 14:04:32.068392	2025-01-28 14:04:32.068392
10	blabla	5	\N	1	1	2025-01-29 10:45:20.188598	2025-01-29 10:45:20.188598
1	Super pub, très agr‚able	5	\N	7	1	2025-01-28 13:01:40.006849	2025-01-28 13:01:40.006849
2	Le service est un peu lent	3	\N	6	2	2025-01-28 13:01:40.006849	2025-01-28 13:01:40.006849
\.

COPY public.users (id, email, birth_date, password, address, name, theme, profil_picture, created_at, updated_at, city_id) FROM stdin;
7	oio@test.com	1994-05-05	Test12345678!	2 rue martin	charles	light	/assets/images/profil-pictures/default-profil-picture.webp	2025-01-31 10:15:41.220038	2025-01-31 10:15:41.220038	1371
8	poiuy@test.com	1994-05-05	Test12345678!	2 rue martin	Antoine	dark	/assets/images/profil-pictures/default-profil-picture.webp	2025-01-31 10:15:41.280962	2025-01-31 10:15:41.280962	1053
9	text2@test.com	1994-05-05	Test12345678!	2 rue martin	Ornella	dark	/assets/images/profil-pictures/default-profil-picture.webp	2025-01-31 10:15:41.374473	2025-01-31 10:15:41.374473	1371
10	tex3@test.com	1994-05-05	Test12345678!	2 rue martin	Manon	light	/assets/images/profil-pictures/default-profil-picture.webp	2025-01-31 10:15:41.417949	2025-01-31 10:15:41.417949	1479
11	text5@test.com	1994-05-05	Test12345678!	2 rue martin	Paul	dark	/assets/images/profil-pictures/default-profil-picture.webp	2025-01-31 10:15:41.512009	2025-01-31 10:15:41.512009	1371
12	text8@test.com	1994-05-05	Test12345678!	2 rue martin	Xavier	light	/assets/images/profil-pictures/default-profil-picture.webp	2025-01-31 10:15:41.570504	2025-01-31 10:15:41.570504	1081
13	text7@test.com	1994-05-05	Test12345678!	2 rue martin	Myrtille	dark	/assets/images/profil-pictures/default-profil-picture.webp	2025-01-31 10:15:41.651496	2025-01-31 10:15:41.651496	1070
14	text9@test.com	1994-05-05	Test12345678!	2 rue martin	Titouan	dark	/assets/images/profil-pictures/default-profil-picture.webp	2025-01-31 10:15:41.729598	2025-01-31 10:15:41.729598	1070
15	tchart@test.com	1994-05-05	Test12345678!	2 rue martin	Serge	dark	/assets/images/profil-pictures/default-profil-picture.webp	2025-01-31 10:15:41.836519	2025-01-31 10:15:41.836519	1070
16	hjhj@test.com	1994-05-05	Test12345678!	2 rue martin	Sophie	dark	/assets/images/profil-pictures/default-profil-picture.webp	2025-01-31 10:15:47.881116	2025-01-31 10:15:47.881116	1070
6	text@test.com	1994-05-05	Test12345678!	2 rue martin	Marie	light	/assets/images/profil-pictures/default-profil-picture.webp	2025-01-31 10:15:41.138519	2025-01-31 10:15:41.138519	1077
\.


