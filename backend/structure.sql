--
-- PostgreSQL database dump
--

-- Dumped from database version 16.6 (Debian 16.6-1.pgdg120+1)
-- Dumped by pg_dump version 17.2

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

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: neondb_owner
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO neondb_owner;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: bar; Type: TABLE; Schema: public; Owner: neondb_owner
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


ALTER TABLE public.bar OWNER TO neondb_owner;

--
-- Name: bar_city; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.bar_city (
    id integer NOT NULL,
    bar_id integer,
    city_id integer
);


ALTER TABLE public.bar_city OWNER TO neondb_owner;

--
-- Name: bar_city_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.bar_city_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bar_city_id_seq OWNER TO neondb_owner;

--
-- Name: bar_city_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.bar_city_id_seq OWNED BY public.bar_city.id;


--
-- Name: bar_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.bar_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bar_id_seq OWNER TO neondb_owner;

--
-- Name: bar_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.bar_id_seq OWNED BY public.bar.id;


--
-- Name: bar_image; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.bar_image (
    id integer NOT NULL,
    bar_id integer,
    image_link character varying(255) DEFAULT NULL::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.bar_image OWNER TO neondb_owner;

--
-- Name: bar_image_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.bar_image_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bar_image_id_seq OWNER TO neondb_owner;

--
-- Name: bar_image_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.bar_image_id_seq OWNED BY public.bar_image.id;


--
-- Name: beer; Type: TABLE; Schema: public; Owner: neondb_owner
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


ALTER TABLE public.beer OWNER TO neondb_owner;

--
-- Name: beer_available; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.beer_available (
    id integer NOT NULL,
    bar_id integer,
    beer_id integer
);


ALTER TABLE public.beer_available OWNER TO neondb_owner;

--
-- Name: beer_available_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.beer_available_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.beer_available_id_seq OWNER TO neondb_owner;

--
-- Name: beer_available_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.beer_available_id_seq OWNED BY public.beer_available.id;


--
-- Name: beer_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.beer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.beer_id_seq OWNER TO neondb_owner;

--
-- Name: beer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.beer_id_seq OWNED BY public.beer.id;


--
-- Name: beer_type; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.beer_type (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    description text
);


ALTER TABLE public.beer_type OWNER TO neondb_owner;

--
-- Name: beer_type_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.beer_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.beer_type_id_seq OWNER TO neondb_owner;

--
-- Name: beer_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.beer_type_id_seq OWNED BY public.beer_type.id;


--
-- Name: city; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.city (
    id integer NOT NULL,
    name character varying(250) NOT NULL,
    latitude double precision,
    longitude double precision,
    code integer
);


ALTER TABLE public.city OWNER TO neondb_owner;

--
-- Name: city_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.city_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.city_id_seq OWNER TO neondb_owner;
ALTER SEQUENCE public.city_id_seq OWNED BY public.city.id;

CREATE TABLE public.comment_image (
    id integer NOT NULL,
    image_link character varying(2083) NOT NULL,
    user_comment_id integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.comment_image OWNER TO neondb_owner;

CREATE SEQUENCE public.comment_image_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.comment_image_id_seq OWNER TO neondb_owner;
ALTER SEQUENCE public.comment_image_id_seq OWNED BY public.comment_image.id;

CREATE TABLE public.favorite_bar (
    id integer NOT NULL,
    user_id integer,
    bar_id integer
);


ALTER TABLE public.favorite_bar OWNER TO neondb_owner;

CREATE SEQUENCE public.favorite_bar_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.favorite_bar_id_seq OWNER TO neondb_owner;
ALTER SEQUENCE public.favorite_bar_id_seq OWNED BY public.favorite_bar.id;

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


ALTER TABLE public.user_comment OWNER TO neondb_owner;

CREATE SEQUENCE public.user_comment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_comment_id_seq OWNER TO neondb_owner;
ALTER SEQUENCE public.user_comment_id_seq OWNED BY public.user_comment.id;

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


ALTER TABLE public.users OWNER TO neondb_owner;

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO neondb_owner;
ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
ALTER TABLE ONLY public.bar ALTER COLUMN id SET DEFAULT nextval('public.bar_id_seq'::regclass);
ALTER TABLE ONLY public.bar_city ALTER COLUMN id SET DEFAULT nextval('public.bar_city_id_seq'::regclass);
ALTER TABLE ONLY public.bar_image ALTER COLUMN id SET DEFAULT nextval('public.bar_image_id_seq'::regclass);
ALTER TABLE ONLY public.beer ALTER COLUMN id SET DEFAULT nextval('public.beer_id_seq'::regclass);
ALTER TABLE ONLY public.beer_available ALTER COLUMN id SET DEFAULT nextval('public.beer_available_id_seq'::regclass);
ALTER TABLE ONLY public.beer_type ALTER COLUMN id SET DEFAULT nextval('public.beer_type_id_seq'::regclass);
ALTER TABLE ONLY public.city ALTER COLUMN id SET DEFAULT nextval('public.city_id_seq'::regclass);
ALTER TABLE ONLY public.comment_image ALTER COLUMN id SET DEFAULT nextval('public.comment_image_id_seq'::regclass);
ALTER TABLE ONLY public.favorite_bar ALTER COLUMN id SET DEFAULT nextval('public.favorite_bar_id_seq'::regclass);
ALTER TABLE ONLY public.user_comment ALTER COLUMN id SET DEFAULT nextval('public.user_comment_id_seq'::regclass);
ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);

ALTER TABLE ONLY public.bar_city
    ADD CONSTRAINT bar_city_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.bar_image
    ADD CONSTRAINT bar_image_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.bar
    ADD CONSTRAINT bar_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.beer_available
    ADD CONSTRAINT beer_available_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.beer
    ADD CONSTRAINT beer_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.beer_type
    ADD CONSTRAINT beer_type_name_unique UNIQUE (name);

ALTER TABLE ONLY public.beer_type
    ADD CONSTRAINT beer_type_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.city
    ADD CONSTRAINT city_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.comment_image
    ADD CONSTRAINT comment_image_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.favorite_bar
    ADD CONSTRAINT favorite_bar_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.user_comment
    ADD CONSTRAINT user_comment_pkey PRIMARY KEY (id);

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

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON SEQUENCES TO neondb_owner;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TYPES TO neondb_owner;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON FUNCTIONS TO neondb_owner;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO neondb_owner;

-- PostgreSQL database dump complete