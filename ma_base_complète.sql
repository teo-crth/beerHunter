SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER SCHEMA public OWNER TO beehunter_bdd_user;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: bar; Type: TABLE; Schema: public; Owner: beehunter_bdd_user
--

CREATE TABLE public.bar (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    address text NOT NULL,
    latitude real,
    longitude real,
    rate real,
    opening_hours text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    city_id integer,
    CONSTRAINT bar_rate_check CHECK (((rate >= (0)::double precision) AND (rate <= (5)::double precision)))
);


ALTER TABLE public.bar OWNER TO beehunter_bdd_user;

--
-- Name: bar_city; Type: TABLE; Schema: public; Owner: beehunter_bdd_user
--

CREATE TABLE public.bar_city (
    id integer NOT NULL,
    bar_id integer,
    city_id integer
);


ALTER TABLE public.bar_city OWNER TO beehunter_bdd_user;

--
-- Name: bar_city_id_seq; Type: SEQUENCE; Schema: public; Owner: beehunter_bdd_user
--

CREATE SEQUENCE public.bar_city_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bar_city_id_seq OWNER TO beehunter_bdd_user;

--
-- Name: bar_city_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: beehunter_bdd_user
--

ALTER SEQUENCE public.bar_city_id_seq OWNED BY public.bar_city.id;


--
-- Name: bar_id_seq; Type: SEQUENCE; Schema: public; Owner: beehunter_bdd_user
--

CREATE SEQUENCE public.bar_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bar_id_seq OWNER TO beehunter_bdd_user;

--
-- Name: bar_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: beehunter_bdd_user
--

ALTER SEQUENCE public.bar_id_seq OWNED BY public.bar.id;


--
-- Name: bar_image; Type: TABLE; Schema: public; Owner: beehunter_bdd_user
--

CREATE TABLE public.bar_image (
    id integer NOT NULL,
    bar_id integer,
    image_link character varying(255) DEFAULT NULL::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.bar_image OWNER TO beehunter_bdd_user;

--
-- Name: bar_image_id_seq; Type: SEQUENCE; Schema: public; Owner: beehunter_bdd_user
--

CREATE SEQUENCE public.bar_image_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bar_image_id_seq OWNER TO beehunter_bdd_user;

--
-- Name: bar_image_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: beehunter_bdd_user
--

ALTER SEQUENCE public.bar_image_id_seq OWNED BY public.bar_image.id;


--
-- Name: beer; Type: TABLE; Schema: public; Owner: beehunter_bdd_user
--

CREATE TABLE public.beer (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    subtitle text DEFAULT NULL::character varying,
    alcool_degree real NOT NULL,
    description text,
    image_link character varying(255) NOT NULL,
    beer_type_id integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.beer OWNER TO beehunter_bdd_user;

--
-- Name: beer_available; Type: TABLE; Schema: public; Owner: beehunter_bdd_user
--

CREATE TABLE public.beer_available (
    id integer NOT NULL,
    bar_id integer,
    beer_id integer
);


ALTER TABLE public.beer_available OWNER TO beehunter_bdd_user;

--
-- Name: beer_available_id_seq; Type: SEQUENCE; Schema: public; Owner: beehunter_bdd_user
--

CREATE SEQUENCE public.beer_available_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.beer_available_id_seq OWNER TO beehunter_bdd_user;

--
-- Name: beer_available_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: beehunter_bdd_user
--

ALTER SEQUENCE public.beer_available_id_seq OWNED BY public.beer_available.id;


--
-- Name: beer_id_seq; Type: SEQUENCE; Schema: public; Owner: beehunter_bdd_user
--

CREATE SEQUENCE public.beer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.beer_id_seq OWNER TO beehunter_bdd_user;

--
-- Name: beer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: beehunter_bdd_user
--

ALTER SEQUENCE public.beer_id_seq OWNED BY public.beer.id;


--
-- Name: beer_type; Type: TABLE; Schema: public; Owner: beehunter_bdd_user
--

CREATE TABLE public.beer_type (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    description text
);


ALTER TABLE public.beer_type OWNER TO beehunter_bdd_user;

--
-- Name: beer_type_id_seq; Type: SEQUENCE; Schema: public; Owner: beehunter_bdd_user
--

CREATE SEQUENCE public.beer_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.beer_type_id_seq OWNER TO beehunter_bdd_user;

--
-- Name: beer_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: beehunter_bdd_user
--

ALTER SEQUENCE public.beer_type_id_seq OWNED BY public.beer_type.id;


--
-- Name: city; Type: TABLE; Schema: public; Owner: beehunter_bdd_user
--

CREATE TABLE public.city (
    id integer NOT NULL,
    name character varying(250) NOT NULL,
    latitude double precision,
    longitude double precision,
    code integer
);


ALTER TABLE public.city OWNER TO beehunter_bdd_user;

--
-- Name: city_id_seq; Type: SEQUENCE; Schema: public; Owner: beehunter_bdd_user
--

CREATE SEQUENCE public.city_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.city_id_seq OWNER TO beehunter_bdd_user;

--
-- Name: city_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: beehunter_bdd_user
--

ALTER SEQUENCE public.city_id_seq OWNED BY public.city.id;


--
-- Name: comment_image; Type: TABLE; Schema: public; Owner: beehunter_bdd_user
--

CREATE TABLE public.comment_image (
    id integer NOT NULL,
    image_link character varying(2083) NOT NULL,
    user_comment_id integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.comment_image OWNER TO beehunter_bdd_user;

--
-- Name: comment_image_id_seq; Type: SEQUENCE; Schema: public; Owner: beehunter_bdd_user
--

CREATE SEQUENCE public.comment_image_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.comment_image_id_seq OWNER TO beehunter_bdd_user;

--
-- Name: comment_image_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: beehunter_bdd_user
--

ALTER SEQUENCE public.comment_image_id_seq OWNED BY public.comment_image.id;


--
-- Name: favorite_bar; Type: TABLE; Schema: public; Owner: beehunter_bdd_user
--

CREATE TABLE public.favorite_bar (
    id integer NOT NULL,
    user_id integer,
    bar_id integer
);


ALTER TABLE public.favorite_bar OWNER TO beehunter_bdd_user;

--
-- Name: favorite_bar_id_seq; Type: SEQUENCE; Schema: public; Owner: beehunter_bdd_user
--

CREATE SEQUENCE public.favorite_bar_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.favorite_bar_id_seq OWNER TO beehunter_bdd_user;

--
-- Name: favorite_bar_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: beehunter_bdd_user
--

ALTER SEQUENCE public.favorite_bar_id_seq OWNED BY public.favorite_bar.id;


--
-- Name: user_comment; Type: TABLE; Schema: public; Owner: beehunter_bdd_user
--

CREATE TABLE public.user_comment (
    id integer NOT NULL,
    text text NOT NULL,
    rate real,
    comment_image_id integer,
    user_id integer,
    bar_id integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT user_comment_rate_check CHECK (((rate >= (0)::double precision) AND (rate <= (5)::double precision)))
);


ALTER TABLE public.user_comment OWNER TO beehunter_bdd_user;

--
-- Name: user_comment_id_seq; Type: SEQUENCE; Schema: public; Owner: beehunter_bdd_user
--

CREATE SEQUENCE public.user_comment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_comment_id_seq OWNER TO beehunter_bdd_user;

--
-- Name: user_comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: beehunter_bdd_user
--

ALTER SEQUENCE public.user_comment_id_seq OWNED BY public.user_comment.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: beehunter_bdd_user
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(50) NOT NULL,
    birth_date date,
    password character varying(2000) NOT NULL,
    address text,
    name character varying(50) DEFAULT NULL::character varying,
    theme character varying(10) DEFAULT 'dark'::character varying,
    profil_picture character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    city_id integer,
    CONSTRAINT users_theme_check CHECK (((theme)::text = ANY ((ARRAY['dark'::character varying, 'light'::character varying])::text[])))
);


ALTER TABLE public.users OWNER TO beehunter_bdd_user;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: beehunter_bdd_user
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO beehunter_bdd_user;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: beehunter_bdd_user
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: bar id; Type: DEFAULT; Schema: public; Owner: beehunter_bdd_user
--

ALTER TABLE ONLY public.bar ALTER COLUMN id SET DEFAULT nextval('public.bar_id_seq'::regclass);


--
-- Name: bar_city id; Type: DEFAULT; Schema: public; Owner: beehunter_bdd_user
--

ALTER TABLE ONLY public.bar_city ALTER COLUMN id SET DEFAULT nextval('public.bar_city_id_seq'::regclass);


--
-- Name: bar_image id; Type: DEFAULT; Schema: public; Owner: beehunter_bdd_user
--

ALTER TABLE ONLY public.bar_image ALTER COLUMN id SET DEFAULT nextval('public.bar_image_id_seq'::regclass);


--
-- Name: beer id; Type: DEFAULT; Schema: public; Owner: beehunter_bdd_user
--

ALTER TABLE ONLY public.beer ALTER COLUMN id SET DEFAULT nextval('public.beer_id_seq'::regclass);


--
-- Name: beer_available id; Type: DEFAULT; Schema: public; Owner: beehunter_bdd_user
--

ALTER TABLE ONLY public.beer_available ALTER COLUMN id SET DEFAULT nextval('public.beer_available_id_seq'::regclass);


--
-- Name: beer_type id; Type: DEFAULT; Schema: public; Owner: beehunter_bdd_user
--

ALTER TABLE ONLY public.beer_type ALTER COLUMN id SET DEFAULT nextval('public.beer_type_id_seq'::regclass);


--
-- Name: city id; Type: DEFAULT; Schema: public; Owner: beehunter_bdd_user
--

ALTER TABLE ONLY public.city ALTER COLUMN id SET DEFAULT nextval('public.city_id_seq'::regclass);


--
-- Name: comment_image id; Type: DEFAULT; Schema: public; Owner: beehunter_bdd_user
--

ALTER TABLE ONLY public.comment_image ALTER COLUMN id SET DEFAULT nextval('public.comment_image_id_seq'::regclass);


--
-- Name: favorite_bar id; Type: DEFAULT; Schema: public; Owner: beehunter_bdd_user
--

ALTER TABLE ONLY public.favorite_bar ALTER COLUMN id SET DEFAULT nextval('public.favorite_bar_id_seq'::regclass);


--
-- Name: user_comment id; Type: DEFAULT; Schema: public; Owner: beehunter_bdd_user
--

ALTER TABLE ONLY public.user_comment ALTER COLUMN id SET DEFAULT nextval('public.user_comment_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: beehunter_bdd_user
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: bar; Type: TABLE DATA; Schema: public; Owner: beehunter_bdd_user
--

COPY public.bar (id, name, address, latitude, longitude, rate, opening_hours, created_at, updated_at, city_id) FROM stdin;
1	O Collins Irish Pub	34 Cr Jean JaurŠs, 84000 Avignon	43.9445	4.80535	4.4	\\"Monday: 8:00ÿAM - 1:00ÿAM\\",\\r\\n\\"Tuesday: 8:00ÿAM - 1:00ÿAM\\",\\r\\n\\"Wednesday: 8:00ÿAM - 1:00ÿAM\\",\\r\\n\\"Thursday: 8:00ÿAM - 1:00ÿAM\\",\\r\\n\\"Friday: 8:00ÿAM - 1:00ÿAM\\",\\r\\n\\"Saturday: 8:00ÿAM - 1:00ÿAM\\",\\r\\n\\"Sunday: 3:00ÿPM - 1:00ÿAM\\"	2025-01-31 10:22:10.218085	2025-01-31 10:22:10.218085	1433
2	The Pipeline	34 Cr Jean JaurŠs, 84000 Avignon	43.9451	4.8054	4.4	\\"Monday: 9:00ÿAM - 0:00ÿAM\\",\\r\\n\\"Tuesday: 9:00ÿAM - 0:00ÿAM\\",\\r\\n\\"Wednesday: 9:00ÿAM - 0:00ÿAM\\",\\r\\n\\"Thursday: 9:00ÿAM - 0:00ÿAM\\",\\r\\n\\"Friday: 9:00ÿAM - 0:00ÿAM\\",\\r\\n\\"Saturday: 9:00ÿAM - 0:00ÿAM\\",\\r\\n\\"Sunday: 6:30ÿPM - 11:30ÿPM\\"	2025-01-31 10:22:10.218085	2025-01-31 10:22:10.218085	1433
\.


--
-- Data for Name: bar_city; Type: TABLE DATA; Schema: public; Owner: beehunter_bdd_user
--

COPY public.bar_city (id, bar_id, city_id) FROM stdin;
6	1	1433
7	2	1433
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
14	Eku Kulminator	Bière hors du commun de part son degré d'alcool	28	Bière allamande brune	/assets/images/beer/eku-carre.webp	2	2025-01-31 14:05:33.88603	2025-01-31 14:05:33.88603
15	1664	Bière Blonde désaltérante	5.5	Bière française emblématique, la 1664 est appréciée pour sa fraîcheur et son caractère désaltérant.	/assets/images/beer/1664-carre.webp	1	2025-01-31 14:05:42.312036	2025-01-31 14:05:42.312036
16	Leffe	Bière belge	6.6	Bière d''abbaye belge, la Leffe Blonde est une bière de dégustation, avec des arômes fruités et épicés, et une légère amertume.	/assets/images/beer/leffe-carre.webp	1	2025-01-31 14:05:51.513639	2025-01-31 14:05:51.513639
17	Kronenbourg	Bière française	5.5	Bière blonde française, brassée avec du houblon Strisselspalt, offrant des notes fruitées et une amertume délicate.	/assets/images/beer/kronenbourg-carre.webp	1	2025-01-31 14:06:00.266377	2025-01-31 14:06:00.266377
18	Desperados	Bière aromatisée	5.9	Bière aromatisée à la tequila, avec des notes d''agrumes et une douceur sucrée, offrant une expérience unique.	/assets/images/beer/desperados-carre.webp	10	2025-01-31 14:06:09.699406	2025-01-31 14:06:09.699406
19	Grimbergen	Bière d'abbaye	6.7	Bière d''abbaye belge, la Grimbergen Blonde est légèrement fruitée, offrant un bel équilibre entre douceur et amertume.	/assets/images/beer/grimbergen-carre.webp	1	2025-01-31 14:06:15.001192	2025-01-31 14:06:15.001192
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
1	Blonde	2025-01-28 13:01:40.006849	2025-01-28 13:01:40.006849	Une biŠre l‚gŠre et rafraŒchissante, souvent de type lager, avec un go–t subtil de houblon.
2	Brune	2025-01-28 13:01:40.006849	2025-01-28 13:01:40.006849	Une biŠre plus fonc‚e, avec des notes de caramel, de chocolat ou de caf‚, souvent plus riche et plus douce.
3	Blanche	2025-01-28 13:01:40.006849	2025-01-28 13:01:40.006849	Une biŠre l‚gŠre, souvent ‚pic‚e avec de la coriandre et de l'‚corce d'orange.
5	Ambr‚e	2025-01-28 13:01:40.006849	2025-01-28 13:01:40.006849	Une biŠre au go–t malt‚, l‚gŠrement sucr‚ et caram‚lis‚, avec une couleur rougeƒtre ou ambr‚e.
4	IPA (India Pale Ale)	2025-01-28 13:01:40.006849	2025-01-28 13:01:40.006849	Une biŠre houblonn‚e et amŠre, souvent avec des ar“mes fruit‚s et floraux.
6	Pilsner	2025-01-31 11:00:42.875314	2025-01-31 11:00:42.875314	Une lager l‚gŠre et croquante, souvent un peu amŠre, d'origine tchŠque.
7	Stout	2025-01-31 11:00:42.875314	2025-01-31 11:00:42.875314	Une biŠre noire, riche et cr‚meuse, souvent avec des ar“mes de caf‚ ou de chocolat.
8	Porter	2025-01-31 11:00:42.875314	2025-01-31 11:00:42.875314	Une biŠre sombre, similaire … la stout mais avec des ar“mes plus doux, souvent de caramel.
9	Pale Ale	2025-01-31 11:00:42.875314	2025-01-31 11:00:42.875314	BiŠre originaire d'Angleterre, qui se caract‚rise par un go–t ‚quilibr‚ entre le malt et le houblon, avec une couleur qui peut varier du dor‚ pƒle … l'ambr‚ clair.
10	Lager	2025-01-31 11:05:06.355911	2025-01-31 11:05:06.355911	Les lagers ont g‚n‚ralement un go–t l‚ger, net et ‚quilibr‚, avec des saveurs malt‚es qui peuvent ˆtre l‚gŠrement sucr‚es ou biscuit‚es. Elles sont souvent moins amŠres que les biŠres comme les IPA (India Pale Ale).
11	Belgian Strong Ale	2025-01-31 12:03:19.649968	2025-01-31 12:03:19.649968	Le Belgian Strong Ale est un style de bière originaire de Belgique, réputé pour sa forte teneur en alcool et ses saveurs riches et complexes. Ces bières sont souvent mûries pendant un certain temps, ce qui permet aux saveurs de se développer et de s’équilibrer. Elles peuvent être un peu sucrées et assez chaudes en raison de la forte teneur en alcool.
\.


--
-- Data for Name: city; Type: TABLE DATA; Schema: public; Owner: beehunter_bdd_user
--

COPY public.city (id, name, latitude, longitude, code) FROM stdin;
990	Amberieu-en-Bugey	45.9608475114	5.3729257777	1
991	Bourg-en-Bresse	46.2051520382	5.24602125501	1
992	Divonne-les-Bains	46.3756333495	6.1158647611	1
993	Ferney-Voltaire	46.2519789243	6.10826403805	1
994	Gex	46.3471891747	6.04650555568	1
995	Miribel	45.8442099203	4.94106746787	1
996	Oyonnax	46.2605435859	5.65344320923	1
997	Saint-Genis-Pouilly	46.254539333	6.0362907345	1
998	Bagneux	49.4601139731	3.27945330014	2
999	Castres	49.8013894137	3.25325245088	2
1000	Chauny	49.619880673	3.21875355041	2
1001	Laon	49.5679724897	3.62089561902	2
1002	Moulins	49.4198471298	3.67884923026	2
1003	Saint-Quentin	49.8472336321	3.27769499462	2
1004	Soissons	49.3791742979	3.32471758491	2
1005	Tergnier	49.6572646109	3.29924077478	2
1006	Villers-Cotterets	49.2392000574	3.09612191097	2
1007	Bagneux	46.6455268495	3.20422374955	3
1008	Cusset	46.1377738304	3.48296708451	3
1009	Moulins	46.5624641056	3.32662040221	3
1010	Vichy	46.1300051383	3.42442081174	3
1011	Yzeure	46.5636456232	3.37978160133	3
1012	Digne-les-Bains	44.0908723554	6.23590323452	4
1013	La Garde	43.8298617013	6.57154524239	4
1014	Manosque	43.8354040831	5.79106654173	4
1015	Saint-Benoit	43.9629414064	6.72386704569	4
1016	Saint-Pierre	43.9088889412	6.92184591099	4
1017	Gap	44.5798600596	6.06486052138	5
1018	Sainte-Marie	44.4639998729	5.47415675357	5
1019	Vitrolles	44.4246526523	5.94769008285	5
1020	Antibes	43.587465146	7.10635418256	6
1021	Beausoleil	43.747724383	7.42222154586	6
1022	Cagnes-sur-Mer	43.6715162078	7.15275703379	6
1023	Cannes	43.5526202843	7.00427592728	6
1024	Le Cannet	43.5729768613	7.00642057758	6
1025	Carros	43.7850390592	7.18414159904	6
1026	Grasse	43.655639428	6.93190508233	6
1027	Mandelieu-la-Napoule	43.5380510468	6.91808936542	6
1028	Menton	43.7908233727	7.49365612374	6
1029	Mouans-Sartoux	43.6185304023	6.96494426706	6
1030	Mougins	43.5961410556	7.00129444919	6
1031	Nice	43.7119992661	7.23826889465	6
1032	Roquebrune-Cap-Martin	43.7638278953	7.4587361611	6
1033	Saint-Laurent-du-Var	43.6859625772	7.18218791815	6
1034	La Trinite	43.7433480978	7.33946073911	6
1035	Valbonne	43.628288325	7.02954476696	6
1036	Vallauris	43.5766472999	7.05836612893	6
1037	Vence	43.7384640641	7.10194436087	6
1038	Villeneuve-Loubet	43.6492560734	7.10728434873	6
1039	Annonay	45.2460902392	4.65026947295	7
1040	Aubenas	44.6102127084	4.39638981424	7
1041	Beaumont	44.5426503498	4.17181045381	7
1042	Guilherand-Granges	44.9301318307	4.86629603942	7
1043	Saint-Priest	44.7131469303	4.53562187216	7
1044	Vernon	44.506232057	4.2261837868	7
1045	Charleville-Mezieres	49.7752965803	4.71724655966	8
1046	Sainte-Marie	49.3713339748	4.67168297398	8
1047	Sedan	49.697058875	4.9298505244	8
1048	Clermont	43.0372197049	1.29061556438	9
1049	Pamiers	43.1234860673	1.61523399037	9
1050	Le Port	42.8356989476	1.38584993584	9
1051	Verdun	42.8060735388	1.69239160264	9
1052	Sainte-Suzanne	43.2055435306	1.3790061442	9
1053	La Chapelle-Saint-Luc	48.3161316832	4.03517553523	10
1054	Fontaine	48.2092891642	4.71805068623	10
1055	Romilly-sur-Seine	48.5185939749	3.72154151549	10
1056	Saint-Andre-les-Vergers	48.2782659904	4.04840305057	10
1057	Sainte-Savine	48.2963408998	4.02333022061	10
1058	Troyes	48.2967099637	4.07827967525	10
1059	Carcassonne	43.2093798444	2.34398855385	11
1060	Castelnaudary	43.3230173159	1.96073752488	11
1061	Lezignan-Corbieres	43.2036730565	2.76215028732	11
1062	Limoux	43.0499293279	2.23958811407	11
1063	Narbonne	43.1652399898	3.02023868739	11
1064	Saint-Benoit	43.0096303677	2.06434477495	11
1065	Saint-Denis	43.3563040517	2.21782788415	11
1066	Villepinte	43.2808698633	2.09551779472	11
1067	Millau	44.0976252203	3.11705384129	12
1068	Rodez	44.3582426254	2.5672793892	12
1069	Villefranche-de-Rouergue	44.3499160171	2.03103287572	12
1070	Aix-en-Provence	43.5360708378	5.39857444582	13
1071	Allauch	43.3533145712	5.51134767187	13
1072	Arles	43.5468692378	4.66215642574	13
1073	Aubagne	43.2934843764	5.56331273477	13
1074	Auriol	43.3607946934	5.6583901873	13
1075	Villeneuve-Tolosane	43.5266707182	1.34648807644	31
1076	Auch	43.6534300414	0.575190250459	32
1077	Auterive	43.5796421888	0.632117026282	32
1078	Beaucaire	43.8370869594	0.375982093244	32
1079	Beaumont	43.9377749989	0.290830760764	32
1080	Blanquefort	43.6742793399	0.807524720457	32
1081	Saint-Andre	43.5589723069	0.858056071738	32
1082	Sainte-Anne	43.7452215949	0.967980737817	32
1083	Sainte-Marie	43.6724633331	0.866328839626	32
1084	Ambares-et-Lagrave	44.9444897713	-0.500579133995	33
1085	Andernos-les-Bains	44.754520164	-1.08109347037	33
1086	Arcachon	44.6529002838	-1.17429790933	33
1087	Begles	44.8016009051	-0.547755768448	33
1088	Biganos	44.6611063153	-0.948829442283	33
1089	Blanquefort	44.9231492741	-0.612268950301	33
1090	Bordeaux	44.8572445351	-0.57369678116	33
1091	Le Bouscat	44.8661298323	-0.602121558626	33
1092	Bruges	44.8889469436	-0.600427664273	33
1093	Cenon	44.8548325665	-0.521018807062	33
1094	Cestas	44.7237410966	-0.726825410115	33
1095	Eysines	44.8797152377	-0.647899474657	33
1096	Floirac	44.8338094646	-0.520646895866	33
1097	Gradignan	44.7709411201	-0.616137682116	33
1098	Gujan-Mestras	44.5940361232	-1.08427455858	33
1099	Le Haillan	44.8690837903	-0.684443512134	33
1100	Leognan	44.7191460436	-0.614707683753	33
1101	Libourne	44.9130767869	-0.234709332068	33
1102	Lormont	44.8765972567	-0.519774925453	33
1103	Merignac	44.8322953289	-0.681733084891	33
1104	Mios	44.6179149385	-0.895043516013	33
1105	Parempuyre	44.9541509661	-0.580766578801	33
1106	Pessac	44.7915990521	-0.676303166277	33
1107	Saint-Andre-de-Cubzac	44.9954623723	-0.43596742679	33
1108	Saint-Medard-en-Jalles	44.8832620816	-0.784239883546	33
1109	Saint-Paul	45.1500987508	-0.590143244865	33
1110	Le Taillan-Medoc	44.9111778103	-0.680843022546	33
1111	Talence	44.8060817507	-0.591124592873	33
1112	La Teste-de-Buch	44.5561823053	-1.17530826791	33
1113	Sassenage	45.2130962637	5.65242107292	38
1114	Seyssinet-Pariset	45.1731193462	5.66971556945	38
1115	Vienne	45.520578372	4.88135156154	38
1116	Villefontaine	45.6136289454	5.15547673355	38
1117	Voiron	45.3791720843	5.58240310671	38
1118	Dole	47.0755452538	5.50062446099	39
1119	Francheville	46.8366646501	5.50234541581	39
1120	Lons-le-Saunier	46.6744796278	5.55733212947	39
1121	Saint-Claude	46.408600398	5.87556247635	39
1122	Saint-Pierre	46.5683636515	5.90301429491	39
1123	Biscarrosse	44.409080109	-1.1773616947	40
1124	Clermont	43.6485435994	-0.909862046514	40
1125	Dax	43.7006746973	-1.06014429759	40
1126	Mont-de-Marsan	43.899361404	-0.490722577455	40
1127	Saint-Paul-les-Dax	43.7464083139	-1.08127980711	40
1128	Tarnos	43.5367457997	-1.4653189934	40
1129	Blois	47.5817013938	1.30625551583	41
1130	Fresnes	47.4383129016	1.41006263534	41
1131	Romorantin-Lanthenay	47.3745226341	1.74456385409	41
1132	Sainte-Anne	47.7590221575	1.08301309316	41
1133	Andrezieux-Boutheon	45.5349913099	4.27650426979	42
1134	Le Chambon-Feugerolles	45.3886064564	4.33196255695	42
1135	Firminy	45.3788146093	4.28879456136	42
1136	Montbrison	45.6008365515	4.0713982073	42
1137	Riorges	46.0429114311	4.03375590925	42
1138	Rive-de-Gier	45.5232368969	4.61000981421	42
1139	Roanne	46.0449112487	4.0797045647	42
1140	Saint-Chamond	45.4698319517	4.50184989506	42
1141	Saint-Cyprien	45.5399613626	4.22968401574	42
1142	Saint-etienne	45.4301235512	4.37913997076	42
1143	Saint-Joseph	45.5552073766	4.61943614225	42
1144	Saint-Just-Saint-Rambert	45.4903250932	4.25026509629	42
1145	Beaumont	45.3118081089	3.33070531118	43
1146	Le Puy-en-Velay	45.0276366659	3.89535229067	43
1147	Blain	47.4628210409	-1.76789479614	44
1148	Bouguenais	47.1709061678	-1.61739752858	44
1149	Carquefou	47.3017191833	-1.47277200095	44
1150	La Chapelle-sur-Erdre	47.3035629617	-1.56078596697	44
1151	Coueron	47.2309985029	-1.72929002573	44
1152	La Baule-Escoublac	47.2909720179	-2.3538291745	44
1153	Guerande	47.3313320913	-2.41703658813	44
1154	Nantes	47.2316356767	-1.54831008605	44
1155	Orvault	47.2739815478	-1.62323898524	44
1156	Pornic	47.1223972452	-2.05182334479	44
1157	Pornichet	47.2615791665	-2.31415650821	44
1158	Reze	47.1762338904	-1.54966399893	44
1159	Saint-Brevin-les-Pins	47.2380057754	-2.1516650013	44
1160	Saint-Herblain	47.2243762412	-1.63434818692	44
1161	Sainte-Luce-sur-Loire	47.2536231327	-1.4728987153	44
1162	Saint-Nazaire	47.2802857028	-2.25379927249	44
1163	Saint-Sebastien-sur-Loire	47.2031024794	-1.4992042742	44
1164	Thouare-sur-Loire	47.2763256866	-1.43162198248	44
1165	Treillieres	47.3178218372	-1.62577302041	44
1166	Vertou	47.1603732625	-1.47052291749	44
1167	Amilly	47.9867116879	2.78217519303	45
1168	La Chapelle-Saint-Mesmin	47.8887063362	1.82847184827	45
1169	Fleury-les-Aubrais	47.9389266189	1.9198911565	45
1170	Gien	47.71227944	2.66549550204	45
1171	Montargis	47.9988427684	2.73588922015	45
1172	Olivet	47.8546997503	1.88823884753	45
1173	Orleans	47.8828634214	1.91610357477	45
1174	Sainte-Genevieve-des-Bois	47.8115452338	2.79379001836	45
1175	Saint-Jean-de-Braye	47.9178497622	1.97241570235	45
1176	Saint-Jean-de-la-Ruelle	47.9116141172	1.87108144709	45
1177	Saran	47.9498311047	1.87809693517	45
1178	Cahors	44.4507370916	1.44075837848	46
1179	Floirac	44.9059208514	1.67151833797	46
1180	Agen	44.2028139104	0.625583928763	47
1181	Marmande	44.5055176845	0.172174280849	47
1182	Villeneuve-sur-Lot	44.4251092866	0.742526167632	47
1183	Mende	44.5294508592	3.48086881176	48
1184	Allonnes	47.3034746947	0.0111127082363	49
1185	Angers	47.476837416	-0.556125995444	49
1186	Avrille	47.5057106265	-0.600788940942	49
1187	Bauge-en-Anjou	47.5466894738	-0.109021794815	49
1188	Beaupreau-en-Mauges	47.2125984545	-0.983619028639	49
1189	Brissac Loire Aubance	47.3416678749	-0.441366325976	49
1190	Annoullin	50.5265153703	2.92753629479	59
1191	Anzin	50.3753643424	3.51113183833	59
1192	Armentieres	50.6913797537	2.8797155328	59
1193	Bailleul	50.7274252798	2.7379912081	59
1194	Gerzat	45.8279149927	3.15493420222	63
1195	Issoire	45.5455577894	3.24499324643	63
1196	Riom	45.8942667778	3.13246469719	63
1197	Saint-Maurice	45.6705565807	3.23800296875	63
1198	Thiers	45.8620554106	3.53945258847	63
1199	Anglet	43.4917846595	-1.51623373371	64
1200	Bayonne	43.4922254016	-1.46607674358	64
1201	Biarritz	43.4695847227	-1.55309857519	64
1202	Billere	43.3045259937	-0.393492580041	64
1203	Hendaye	43.3656373687	-1.76396662	64
1204	Lons	43.3212113158	-0.401734390624	64
1205	Oloron-Sainte-Marie	43.1560871189	-0.587546244432	64
1206	Orthez	43.4943173399	-0.779874853399	64
1207	Pau	43.3200189773	-0.350337918181	64
1208	Saint-Jean-de-Luz	43.3947886873	-1.63099021573	64
1209	Urrugne	43.3497136026	-1.69722838309	64
1210	Lourdes	43.1074297344	-0.0768069387932	65
1211	Sainte-Marie	42.9691035062	0.628958999643	65
1212	Saint-Paul	43.0860017819	0.510432995882	65
1213	Tarbes	43.2347859635	0.0660093937851	65
1214	Argeles-sur-Mer	42.5352193463	3.02429862885	66
1215	Cabestany	42.6790392044	2.94628633406	66
1216	Canet-en-Roussillon	42.6841288047	3.01161744752	66
1217	Perpignan	42.6965954131	2.89936953979	66
1218	Pia	42.7487012331	2.91497381059	66
1219	Saint-Andre	42.5524573215	2.98000507261	66
1220	Saint-Cyprien	42.6220280294	3.01622014324	66
1221	Saint-Esteve	42.7151122221	2.84611914185	66
1222	Saint-Nazaire	42.6621428836	2.98670142131	66
1223	Bischheim	48.6215316062	7.75864282518	67
1224	Bischwiller	48.7581317312	7.8599836461	67
1225	Brumath	48.7204656106	7.71740193625	67
1226	Erstein	48.4213687934	7.68523629922	67
1227	Haguenau	48.8417047695	7.83010404968	67
1228	Honheim	48.6242068412	7.75365666565	67
1229	Illkirch-Graffenstaden	48.5200498962	7.73129588098	67
1230	Lingolsheim	48.5544875852	7.68093840708	67
1231	Obernai	48.4593467321	7.48006434701	67
1232	Ostwald	48.5471323955	7.70760430953	67
1233	Saint-Maurice	48.3329201616	7.33527285146	67
1234	Saint-Pierre	48.3845643843	7.46512483546	67
1235	Saverne	48.7402250066	7.34206238199	67
1236	Schiltigheim	48.6118660258	7.74408199334	67
1237	Selestat	48.2481136279	7.46224896454	67
1238	Strasbourg	48.5712679849	7.76752679517	67
1239	Cernay	47.7945078153	7.17932820409	68
1240	Colmar	48.1099405789	7.38468690323	68
1241	Guebwiller	47.9096692207	7.21013500007	68
1242	Illzach	47.7734992	7.36011136903	68
1243	Kingersheim	47.7889765168	7.32299335222	68
1244	Mulhouse	47.749163303	7.32570047509	68
1245	Pfastatt	47.7696767881	7.29485630306	68
1246	Riedisheim	47.7396931501	7.36582056128	68
1247	Rixheim	47.7495819243	7.4072406005	68
1248	Saint-Louis	47.6016553367	7.54061872745	68
1249	Wittelsheim	47.7987366521	7.24011099826	68
1250	Wittenheim	47.8102988155	7.31251407267	68
1251	Brignais	45.678117475	4.75268787981	69
1252	Bron	45.7344856902	4.91168159471	69
1253	Caluire-et-Cuire	45.7974053648	4.85124857101	69
1254	Craponne	45.7462853462	4.72672357999	69
1255	ecully	45.7821499466	4.7721681177	69
1256	Francheville	45.7378794318	4.75508314041	69
1257	Givors	45.5816626973	4.7572616296	69
1258	Grigny	45.6080535265	4.78645083138	69
1259	Saint-Fons	45.7011050588	4.85046367008	69
1260	Sainte-Foy-les-Lyon	45.7359781395	4.79343173908	69
1261	Saint-Genis-Laval	45.6936777293	4.78919028453	69
1262	Tarare	45.9036535552	4.42375959345	69
1263	Tassin-la-Demi-Lune	45.7628681769	4.75540595543	69
1264	Vaulx-en-Velin	45.7858821061	4.92637767698	69
1265	Venissieux	45.7037728826	4.88137668221	69
1266	Villeurbanne	45.7707704179	4.88845817426	69
1267	Chassieu	45.7376148968	4.96172914286	69
1268	Corbas	45.6680498711	4.90843949215	69
1269	Decines-Charpieu	45.7717277447	4.96142704635	69
1270	Genas	45.7297209932	5.01590344241	69
1271	Meyzieu	45.7770899686	5.00632679347	69
1272	Mions	45.6647373498	4.94915210897	69
1273	Rillieux-la-Pape	45.8205988109	4.89822639815	69
1274	Saint-Priest	45.701466556	4.94882071665	69
1275	Hericourt	47.5698613671	6.76517349246	70
1276	Igny	47.4821498978	5.75563674329	70
1277	La Rochelle	47.7523236949	5.72464823314	70
1278	Vesoul	47.6320408648	6.1548458149	70
1279	Autun	46.945536773	4.31060069532	71
1280	Le Creusot	46.8068539189	4.42642301163	71
1281	Massy	46.4898679694	4.60948900655	71
1282	Montceau-les-Mines	46.6762539128	4.3540960404	71
1283	Passy	46.5408746813	4.53540370263	71
1284	Saint-Gilles	46.8776228817	4.66403200389	71
1285	Torcy	46.7663790814	4.44629007139	71
1286	Allonnes	47.9589683966	0.143770981533	72
1287	La Fleche	47.6893893794	-0.0646954849714	72
1288	Le Mans	47.9885256718	0.200030493539	72
1289	Sable-sur-Sarthe	47.8378265007	-0.354705885665	72
1290	Aix-les-Bains	45.6978541675	5.90388626955	73
1291	Albertville	45.6683987277	6.40460338643	73
1292	Chambery	45.583182552	5.90903392417	73
1293	La Motte-Servolex	45.6011711771	5.85409653786	73
1294	Le Pontet	45.497081703	6.23653163392	73
1295	Rochefort	45.5807306821	5.71351336836	73
1296	Saint-Andre	45.2241143172	6.61633706922	73
1297	Saint-Paul	45.6725948958	5.79201634508	73
1298	La Trinite	45.5038702551	6.15205404986	73
1299	Annecy	45.8906432566	6.12551773598	74
1300	Annemasse	46.1909730986	6.24250704322	74
1301	Beaumont	46.0976635697	6.12074518078	74
1302	Bonneville	46.0739003968	6.40868532191	74
1303	Chaumont	46.044949243	5.94515955142	74
1304	Clermont	45.9734444894	5.90937510902	74
1305	Cluses	46.0631088613	6.57892080059	74
1306	Gaillard	46.1818085953	6.20707666644	74
1307	Passy	45.9545838758	6.74056895873	74
1308	La Roche-sur-Foron	46.0431484138	6.30107653595	74
1309	Rumilly	45.8555126651	5.94075287432	74
1310	Saint-Julien-en-Genevois	46.139365545	6.07881171095	74
1311	Sallanches	45.9468155788	6.60711053078	74
1312	Thonon-les-Bains	46.3704258049	6.48194336071	74
1313	Vetraz-Monthoux	46.1810228514	6.26266311995	74
1314	Barentin	49.5454370326	0.957011967644	76
1315	Bois-Guillaume	49.4717615714	1.12022637351	76
1316	Bolbec	49.5754807674	0.484404802201	76
1317	Canteleu	49.4330992435	1.01355208279	76
1318	Caudebec-les-Elbeuf	49.2820542128	1.02549551616	76
1319	Deville-les-Rouen	49.4661147987	1.0514305734	76
1320	Dieppe	49.9222503951	1.08681168449	76
1321	Elbeuf	49.2767979948	0.997154590875	76
1322	Fecamp	49.7523245306	0.395297587433	76
1323	Le Grand-Quevilly	49.4093798045	1.03999262153	76
1324	Le Havre	49.498452502	0.140153719153	76
1325	Maromme	49.4769434634	1.03230514083	76
1326	Massy	49.6878599018	1.39541182981	76
1327	Montivilliers	49.5442665298	0.190325264974	76
1328	Mont-Saint-Aignan	49.4676577166	1.08169720921	76
1329	Oissel	49.3477840873	1.07400763141	76
1330	Le Petit-Quevilly	49.4238134718	1.06033289032	76
1331	Rouen	49.4413460103	1.09256784278	76
1332	Saint-etienne-du-Rouvray	49.3814944369	1.08976892912	76
1333	Sotteville-les-Rouen	49.4104887444	1.09509946531	76
1334	Yvetot	49.6175135557	0.761699633531	76
1335	Avon	48.4129699101	2.73351873997	77
1336	Brie-Comte-Robert	48.6920490316	2.6140606052	77
1337	Bussy-Saint-Georges	48.8308269318	2.7225014237	77
1338	Cesson	48.5647346588	2.59524476663	77
1339	Champs-sur-Marne	48.8483311726	2.59610325483	77
1340	Chelles	48.883962967	2.59686448583	77
1341	Claye-Souilly	48.9429697515	2.67523211808	77
1342	Combs-la-Ville	48.657908631	2.57516916269	77
1343	Coulommiers	48.8122991656	3.09124381847	77
1344	Dammarie-les-Lys	48.5138338655	2.62854374259	77
1345	Dammartin-en-Goele	49.0541690491	2.67926104225	77
1346	Fontainebleau	48.4066856508	2.68031396389	77
1347	Lagny-sur-Marne	48.8730701858	2.70978081313	77
1348	Lieusaint	48.6259910244	2.54994732668	77
1349	Lognes	48.8332806021	2.63346363172	77
1350	Meaux	48.9570625667	2.90003097245	77
1351	Le Mee-sur-Seine	48.5394588477	2.62902482677	77
1352	Melun	48.5444723553	2.65795821917	77
1353	Mitry-Mory	48.9779450158	2.61244465751	77
1354	Moissy-Cramayel	48.6285851533	2.5960231045	77
1355	Montereau-Fault-Yonne	48.3898830911	2.96155479657	77
1356	Montevrain	48.8682918937	2.74959681841	77
1357	Moret-Loing-et-Orvanne	48.365092921	2.81172585849	77
1358	Nemours	48.2596067909	2.71107993087	77
1359	Noisiel	48.8460926469	2.61997100426	77
1360	Ozoir-la-Ferriere	48.7635612396	2.67962508199	77
1361	Pontault-Combault	48.7871411658	2.61407436985	77
1362	Provins	48.5633093312	3.28756780085	77
1363	Roissy-en-Brie	48.7900855424	2.66122415764	77
1364	Saint-Fargeau-Ponthierry	48.5390914714	2.52499710746	77
1365	Savigny-le-Temple	48.5884785769	2.57373861268	77
1366	Thorigny-sur-Marne	48.8918979999	2.7123703432	77
1367	Torcy	48.8532553496	2.65123227423	77
1368	Vaires-sur-Marne	48.8697812117	2.63565952774	77
1369	Vaux-le-Penil	48.5245871061	2.69727154378	77
1370	Villeparisis	48.9419981883	2.61700200964	77
1371	Acheres	48.9717990892	2.09003871824	78
1372	Andresy	48.9815454378	2.05025746939	78
1373	Aubergenville	48.9626916321	1.84870251915	78
1374	Saint-Germain-en-Laye	48.9407041394	2.09870929375	78
1375	Sartrouville	48.9396085498	2.17458686513	78
1376	Trappes	48.7750019561	1.99344014312	78
1377	Triel-sur-Seine	48.9780282513	2.00877051663	78
1378	Velizy-Villacoublay	48.783985823	2.19707485523	78
1379	Verneuil-sur-Seine	48.9872093367	1.96276532174	78
1380	Vernouillet	48.9655697167	1.97530302109	78
1381	Versailles	48.8025669671	2.11789297191	78
1382	Le Vesinet	48.8938640591	2.13039312004	78
1383	Villepreux	48.8311450096	2.0130908572	78
1384	Viroflay	48.802404069	2.17151291149	78
1385	Voisins-le-Bretonneux	48.758677648	2.04850691768	78
1386	Avon	46.3723048467	0.00235793629943	79
1387	Bressuire	46.8545755683	-0.479375922286	79
1388	Niort	46.328260242	-0.465353019369	79
1389	Thouars	46.9828628407	-0.199581467021	79
1390	Abbeville	50.1083582944	1.83209170207	80
1391	Amiens	49.9009532186	2.29007445539	80
1392	Bailleul	50.0258469553	1.85504998137	80
1393	Bonneville	50.0778725403	2.26234835981	80
1394	Flers	50.0506500725	2.81773522664	80
1395	Maurepas	49.9853157676	2.85285166012	80
1396	Saint-Gratien	49.9651618881	2.4032049879	80
1397	Albi	43.9258213622	2.14686328555	81
1398	Castres	43.6156511237	2.23787231587	81
1399	Gaillac	43.9170968776	1.88647213801	81
1400	Graulhet	43.7576562195	2.00122512851	81
1401	Lavaur	43.6895628711	1.79437213708	81
1402	Saint-Andre	43.9326309582	2.45817547307	81
1403	Auterive	43.8551653218	0.970551762062	82
1404	Castelsarrasin	44.0490326525	1.12348123121	82
1405	Moissac	44.1262518079	1.09834758014	82
1406	Montauban	44.0222594578	1.36408636501	82
1407	Valence	44.1068332095	0.897921093494	82
1408	Brignoles	43.3992941902	6.07740244296	83
1409	Cogolin	43.2464550515	6.52192234084	83
1410	La Crau	43.1635207421	6.09268351583	83
1411	Cuers	43.2411645502	6.06856350453	83
1412	Draguignan	43.5357513285	6.45436569191	83
1413	Frejus	43.4719558114	6.76361597424	83
1414	La Garde	43.1263279384	6.01898164719	83
1415	Hyeres	43.1018713534	6.18898508469	83
1416	La Londe-les-Maures	43.1689213414	6.24285151023	83
1417	Le Luc	43.3804648949	6.30599950133	83
1418	Ollioules	43.1386133658	5.85369204547	83
1419	Le Pradet	43.099405984	6.02844015499	83
1420	Roquebrune-sur-Argens	43.4285090958	6.65212881719	83
1421	Saint-Cyr-sur-Mer	43.1720355248	5.70832603708	83
1422	Sainte-Maxime	43.3564730986	6.61172790208	83
1423	Saint-Maximin-la-Sainte-Baume	43.4509676414	5.85962873535	83
1424	Saint-Raphael	43.4574625431	6.84734210398	83
1425	Sanary-sur-Mer	43.138282853	5.79588814177	83
1426	La Seyne-sur-Mer	43.0880294967	5.87089841754	83
1427	Six-Fours-les-Plages	43.086818602	5.82924464931	83
1428	Sollies-Pont	43.1907611248	6.06327697157	83
1429	Toulon	43.1361589728	5.93239634249	83
1430	La Valette-du-Var	43.1499152044	5.99222538877	83
1431	Vidauban	43.4015046271	6.44908485499	83
1432	Apt	43.879393265	5.38921757843	84
1433	Avignon	43.9352448339	4.84071572505	84
1434	Bollene	44.2882016409	4.75235956257	84
1435	Carpentras	44.0593802565	5.06134844776	84
1436	Cavaillon	43.8508361826	5.03606300916	84
1437	Saint-Hilaire-de-Riez	46.7432732188	-1.96439228965	85
1438	Buxerolles	46.6054095506	0.369205479606	86
1439	Cernay	46.8366061305	0.301673883746	86
1440	Poitiers	46.5839207726	0.359947653003	86
1441	Saint-Benoit	46.5486469496	0.352443691442	86
1442	Vernon	46.4308038321	0.481683351308	86
1443	Limoges	45.8542549589	1.2487579024	87
1444	Panazol	45.8407332178	1.32357791715	87
1445	Saint-Junien	45.9024520048	0.887855844778	87
1446	Saint-Paul	45.7524342928	1.44281385346	87
1447	epinal	48.1631202656	6.47989286928	88
1448	Saint-Die-des-Vosges	48.2967093514	6.93809367547	88
1449	Saint-Paul	48.3309340459	5.8864017008	88
1450	Auxerre	47.793488225	3.58168281761	89
1451	Beaumont	47.9149271297	3.55727569805	89
1452	Villeneuve-la-Garenne	48.9364061917	2.32448995943	92
1453	Aubervilliers	48.9121722626	2.38445513768	93
1454	Aulnay-sous-Bois	48.9458384367	2.49329041687	93
1455	Bagnolet	48.8690836308	2.42274096688	93
1456	Le Blanc-Mesnil	48.9395475536	2.46112148528	93
1457	Bobigny	48.907688244	2.43863982727	93
1458	Bondy	48.9023234526	2.4837276939	93
1459	Le Bourget	48.9361847458	2.42827855593	93
1460	Clichy-sous-Bois	48.9076285106	2.5462022266	93
1461	La Courneuve	48.9322569546	2.39978064801	93
1462	Drancy	48.9234246259	2.44492688692	93
1463	Dugny	48.9503408732	2.4238637503	93
1464	epinay-sur-Seine	48.9550132062	2.31453043231	93
1465	Gagny	48.8820763119	2.5449484757	93
1466	Les Lilas	48.8819208939	2.419667821	93
1467	Livry-Gargan	48.9197633213	2.53486592332	93
1468	Montfermeil	48.8982616679	2.56714354796	93
1469	Montreuil	48.8633175054	2.44816211857	93
1470	Neuilly-Plaisance	48.8643287852	2.51040249898	93
1471	Neuilly-sur-Marne	48.8624578581	2.54000288785	93
1472	Noisy-le-Grand	48.8361825401	2.56443736814	93
1473	Noisy-le-Sec	48.891322463	2.45913647372	93
1474	Pantin	48.8983093876	2.40872147475	93
1475	Les Pavillons-sous-Bois	48.9082060253	2.50297448267	93
1476	Pierrefitte-sur-Seine	48.9609833355	2.36328125445	93
1477	Le Pre-Saint-Gervais	48.8846734877	2.40542232961	93
1478	Le Raincy	48.8967447585	2.51973664021	93
1479	Romainville	48.8852118968	2.43767884231	93
1480	Rosny-sous-Bois	48.8745763768	2.4863404591	93
1481	Saint-Denis	48.9295650455	2.3592429975	93
1482	Sevran	48.9386070153	2.53124057567	93
1483	Stains	48.9567775699	2.3854495629	93
1484	Tremblay-en-France	48.9784304121	2.55468501543	93
1485	Villemomble	48.8848370021	2.50893406035	93
1486	Villepinte	48.9590202538	2.53630634206	93
1487	Villetaneuse	48.9572976501	2.34506633651	93
1488	Alfortville	48.7960843864	2.42124593241	94
1489	Arcueil	48.8058803597	2.33351024984	94
1490	Boissy-Saint-Leger	48.7470359922	2.52528049019	94
1491	Bonneuil-sur-Marne	48.7733620104	2.48799310463	94
1492	Bry-sur-Marne	48.8384095661	2.52319657626	94
1493	Cachan	48.7916121646	2.33153313164	94
1494	Champigny-sur-Marne	48.817254364	2.51709815257	94
1495	Charenton-le-Pont	48.8228084978	2.40760915477	94
1496	Chennevieres-sur-Marne	48.7976502878	2.54157630073	94
1497	Chevilly-Larue	48.766848001	2.35306611234	94
1498	Choisy-le-Roi	48.764315118	2.41742518222	94
1499	Creteil	48.7837401836	2.45463530415	94
1500	Fontenay-sous-Bois	48.8511046382	2.47395409774	94
1501	Fresnes	48.7571343016	2.32612839743	94
1502	Gentilly	48.8132044389	2.34420659702	94
1503	Jouy-le-Moutier	49.0113625056	2.03408317867	95
1504	Louvres	49.0422977702	2.50358491408	95
1505	Montigny-les-Cormeilles	48.9938035561	2.19351793046	95
1506	Montmagny	48.9699195841	2.3460753179	95
1507	Montmorency	48.9918643363	2.32119797848	95
1508	Osny	49.0676589923	2.06311678451	95
1509	Persan	49.1497441715	2.26978393249	95
1510	Pontoise	49.0513737853	2.09487928948	95
1511	Saint-Brice-sous-Foret	49.0019033624	2.35030688962	95
1512	Saint-Gratien	48.9689724948	2.28518003438	95
1513	Saint-Leu-la-Foret	49.0202164812	2.24676044206	95
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
4	BiŠre excellente mais prix un peu ‚lev‚	4	\N	4	4	2025-01-28 13:01:40.006849	2025-01-28 13:01:40.006849
5	Ambiance chaleureuse, trŠs bon moment	5	\N	5	5	2025-01-28 13:01:40.006849	2025-01-28 13:01:40.006849
6	test comment	5	1	1	1	2025-01-28 14:03:04.470038	2025-01-28 14:03:04.470038
7	test comment	5	1	1	1	2025-01-28 14:03:43.243611	2025-01-28 14:03:43.243611
8	test comment	5	1	1	1	2025-01-28 14:03:50.981507	2025-01-28 14:03:50.981507
9	test comment	5	1	1	1	2025-01-28 14:04:32.068392	2025-01-28 14:04:32.068392
10	blabla	5	\N	1	1	2025-01-29 10:45:20.188598	2025-01-29 10:45:20.188598
1	Super pub, trŠs agr‚able	5	\N	7	1	2025-01-28 13:01:40.006849	2025-01-28 13:01:40.006849
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


--
-- Name: bar_city_id_seq; Type: SEQUENCE SET; Schema: public; Owner: beehunter_bdd_user
--

SELECT pg_catalog.setval('public.bar_city_id_seq', 7, true);


--
-- Name: bar_id_seq; Type: SEQUENCE SET; Schema: public; Owner: beehunter_bdd_user
--

SELECT pg_catalog.setval('public.bar_id_seq', 5, true);


--
-- Name: bar_image_id_seq; Type: SEQUENCE SET; Schema: public; Owner: beehunter_bdd_user
--

SELECT pg_catalog.setval('public.bar_image_id_seq', 6, true);


--
-- Name: beer_available_id_seq; Type: SEQUENCE SET; Schema: public; Owner: beehunter_bdd_user
--

SELECT pg_catalog.setval('public.beer_available_id_seq', 5, true);


--
-- Name: beer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: beehunter_bdd_user
--

SELECT pg_catalog.setval('public.beer_id_seq', 21, true);


--
-- Name: beer_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: beehunter_bdd_user
--

SELECT pg_catalog.setval('public.beer_type_id_seq', 11, true);


--
-- Name: city_id_seq; Type: SEQUENCE SET; Schema: public; Owner: beehunter_bdd_user
--

SELECT pg_catalog.setval('public.city_id_seq', 1513, true);


--
-- Name: comment_image_id_seq; Type: SEQUENCE SET; Schema: public; Owner: beehunter_bdd_user
--

SELECT pg_catalog.setval('public.comment_image_id_seq', 5, true);


--
-- Name: favorite_bar_id_seq; Type: SEQUENCE SET; Schema: public; Owner: beehunter_bdd_user
--

SELECT pg_catalog.setval('public.favorite_bar_id_seq', 5, true);


--
-- Name: user_comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: beehunter_bdd_user
--

SELECT pg_catalog.setval('public.user_comment_id_seq', 10, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: beehunter_bdd_user
--

SELECT pg_catalog.setval('public.users_id_seq', 16, true);


--
-- Name: bar_city bar_city_pkey; Type: CONSTRAINT; Schema: public; Owner: beehunter_bdd_user
--

ALTER TABLE ONLY public.bar_city
    ADD CONSTRAINT bar_city_pkey PRIMARY KEY (id);


--
-- Name: bar_image bar_image_pkey; Type: CONSTRAINT; Schema: public; Owner: beehunter_bdd_user
--

ALTER TABLE ONLY public.bar_image
    ADD CONSTRAINT bar_image_pkey PRIMARY KEY (id);


--
-- Name: bar bar_pkey; Type: CONSTRAINT; Schema: public; Owner: beehunter_bdd_user
--

ALTER TABLE ONLY public.bar
    ADD CONSTRAINT bar_pkey PRIMARY KEY (id);


--
-- Name: beer_available beer_available_pkey; Type: CONSTRAINT; Schema: public; Owner: beehunter_bdd_user
--

ALTER TABLE ONLY public.beer_available
    ADD CONSTRAINT beer_available_pkey PRIMARY KEY (id);


--
-- Name: beer beer_pkey; Type: CONSTRAINT; Schema: public; Owner: beehunter_bdd_user
--

ALTER TABLE ONLY public.beer
    ADD CONSTRAINT beer_pkey PRIMARY KEY (id);


--
-- Name: beer_type beer_type_name_unique; Type: CONSTRAINT; Schema: public; Owner: beehunter_bdd_user
--

ALTER TABLE ONLY public.beer_type
    ADD CONSTRAINT beer_type_name_unique UNIQUE (name);


--
-- Name: beer_type beer_type_pkey; Type: CONSTRAINT; Schema: public; Owner: beehunter_bdd_user
--

ALTER TABLE ONLY public.beer_type
    ADD CONSTRAINT beer_type_pkey PRIMARY KEY (id);


--
-- Name: city city_pkey; Type: CONSTRAINT; Schema: public; Owner: beehunter_bdd_user
--

ALTER TABLE ONLY public.city
    ADD CONSTRAINT city_pkey PRIMARY KEY (id);


--
-- Name: comment_image comment_image_pkey; Type: CONSTRAINT; Schema: public; Owner: beehunter_bdd_user
--

ALTER TABLE ONLY public.comment_image
    ADD CONSTRAINT comment_image_pkey PRIMARY KEY (id);


--
-- Name: favorite_bar favorite_bar_pkey; Type: CONSTRAINT; Schema: public; Owner: beehunter_bdd_user
--

ALTER TABLE ONLY public.favorite_bar
    ADD CONSTRAINT favorite_bar_pkey PRIMARY KEY (id);


--
-- Name: user_comment user_comment_pkey; Type: CONSTRAINT; Schema: public; Owner: beehunter_bdd_user
--

ALTER TABLE ONLY public.user_comment
    ADD CONSTRAINT user_comment_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: beehunter_bdd_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.bar_city
    ADD CONSTRAINT bar_city_ibfk_1 FOREIGN KEY (bar_id) REFERENCES public.bar(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.bar_city
    ADD CONSTRAINT bar_city_ibfk_2 FOREIGN KEY (city_id) REFERENCES public.city(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.bar_image
    ADD CONSTRAINT bar_image_ibfk_1 FOREIGN KEY (bar_id) REFERENCES public.bar(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.beer_available
    ADD CONSTRAINT beer_available_ibfk_1 FOREIGN KEY (bar_id) REFERENCES public.bar(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.beer_available
    ADD CONSTRAINT beer_available_ibfk_2 FOREIGN KEY (beer_id) REFERENCES public.beer(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.beer
    ADD CONSTRAINT beer_ibfk_1 FOREIGN KEY (beer_type_id) REFERENCES public.beer_type(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.comment_image
    ADD CONSTRAINT comment_image_ibfk_1 FOREIGN KEY (user_comment_id) REFERENCES public.user_comment(id);

ALTER TABLE ONLY public.favorite_bar
    ADD CONSTRAINT favorite_bar_ibfk_1 FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.favorite_bar
    ADD CONSTRAINT favorite_bar_ibfk_2 FOREIGN KEY (bar_id) REFERENCES public.bar(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.users
    ADD CONSTRAINT fk_city FOREIGN KEY (city_id) REFERENCES public.city(id);

ALTER TABLE ONLY public.bar
    ADD CONSTRAINT fk_city_id FOREIGN KEY (city_id) REFERENCES public.city(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.user_comment
    ADD CONSTRAINT user_comment_ibfk_3 FOREIGN KEY (comment_image_id) REFERENCES public.comment_image(id);

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON SEQUENCES TO beehunter_bdd_user;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TYPES TO beehunter_bdd_user;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON FUNCTIONS TO beehunter_bdd_user;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO beehunter_bdd_user;

