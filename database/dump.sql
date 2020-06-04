--
-- PostgreSQL database dump
--

-- Dumped from database version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
ALTER TABLE ONLY public.carts DROP CONSTRAINT carts_pkey;
ALTER TABLE ONLY public."cartItems" DROP CONSTRAINT "cartItems_pkey";
ALTER TABLE public.products ALTER COLUMN "productId" DROP DEFAULT;
ALTER TABLE public.orders ALTER COLUMN "orderId" DROP DEFAULT;
ALTER TABLE public.carts ALTER COLUMN "cartId" DROP DEFAULT;
ALTER TABLE public."cartItems" ALTER COLUMN "cartItemId" DROP DEFAULT;
DROP SEQUENCE public."products_productId_seq";
DROP TABLE public.products;
DROP SEQUENCE public."orders_orderId_seq";
DROP TABLE public.orders;
DROP SEQUENCE public."carts_cartId_seq";
DROP TABLE public.carts;
DROP SEQUENCE public."cartItems_cartItemId_seq";
DROP TABLE public."cartItems";
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: cartItems; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."cartItems" (
    "cartItemId" integer NOT NULL,
    "cartId" integer NOT NULL,
    "productId" integer NOT NULL,
    price integer NOT NULL
);


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."cartItems_cartItemId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."cartItems_cartItemId_seq" OWNED BY public."cartItems"."cartItemId";


--
-- Name: carts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.carts (
    "cartId" integer NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: carts_cartId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."carts_cartId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: carts_cartId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."carts_cartId_seq" OWNED BY public.carts."cartId";


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    "orderId" integer NOT NULL,
    "cartId" integer NOT NULL,
    name text NOT NULL,
    "creditCard" text NOT NULL,
    "shippingAddress" text NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: orders_orderId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."orders_orderId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_orderId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."orders_orderId_seq" OWNED BY public.orders."orderId";


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    "productId" integer NOT NULL,
    name text NOT NULL,
    price integer NOT NULL,
    image text NOT NULL,
    "shortDescription" text NOT NULL,
    "longDescription" text NOT NULL,
    madewith character varying(255),
    "imageDetail" character varying(255)
);


--
-- Name: products_productId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."products_productId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_productId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."products_productId_seq" OWNED BY public.products."productId";


--
-- Name: cartItems cartItemId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems" ALTER COLUMN "cartItemId" SET DEFAULT nextval('public."cartItems_cartItemId_seq"'::regclass);


--
-- Name: carts cartId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts ALTER COLUMN "cartId" SET DEFAULT nextval('public."carts_cartId_seq"'::regclass);


--
-- Name: orders orderId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN "orderId" SET DEFAULT nextval('public."orders_orderId_seq"'::regclass);


--
-- Name: products productId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN "productId" SET DEFAULT nextval('public."products_productId_seq"'::regclass);


--
-- Data for Name: cartItems; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."cartItems" ("cartItemId", "cartId", "productId", price) FROM stdin;
1	51	2	2595
2	52	2	2595
3	53	3	2900
4	54	3	2900
5	55	3	2900
6	56	3	2900
7	57	1	2999
8	58	3	2900
9	59	3	2900
10	60	3	2900
11	61	3	2900
12	62	3	2900
13	63	3	2900
14	64	1	2999
15	65	1	2999
16	66	1	2999
17	67	2	2595
18	68	1	2999
19	69	1	2999
20	70	3	2900
21	71	2	2595
22	72	6	830
23	73	3	2900
24	76	5	9900
25	77	5	9900
26	77	4	999
27	77	3	2900
28	77	3	2900
29	78	2	2595
30	78	2	2595
31	78	2	2595
32	78	2	2595
33	78	1	2999
34	78	2	2595
35	78	2	2595
36	78	2	2595
37	78	2	2595
38	78	2	2595
39	78	2	2595
40	78	2	2595
41	78	2	2595
42	78	2	2595
43	78	2	2595
44	78	1	2999
45	78	2	2595
46	78	2	2595
47	78	2	2595
48	78	3	2900
49	78	3	2900
50	78	6	830
51	78	2	2595
52	78	3	2900
53	78	3	2900
54	78	3	2900
55	78	3	2900
56	78	3	2900
57	78	3	2900
58	78	3	2900
59	78	3	2900
60	78	6	830
61	78	5	9900
62	78	4	999
63	78	5	9900
64	78	6	830
65	79	1	1999
66	79	1	1999
67	79	2	1999
68	80	1	1999
70	80	3	1999
71	79	1	1999
135	81	4	1999
138	81	5	1999
140	81	2	1999
\.


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.carts ("cartId", "createdAt") FROM stdin;
1	2020-04-26 02:06:46.0731+00
2	2020-04-26 05:44:44.14298+00
3	2020-04-26 05:44:50.261168+00
4	2020-04-26 06:13:45.703858+00
5	2020-04-26 06:14:25.134274+00
6	2020-04-26 06:20:10.958494+00
7	2020-04-26 06:21:08.875919+00
8	2020-04-26 06:25:27.378037+00
9	2020-04-26 06:25:45.857808+00
10	2020-04-26 06:27:11.453112+00
11	2020-04-26 06:29:34.045255+00
12	2020-04-26 06:29:55.101349+00
13	2020-04-26 06:32:05.367551+00
14	2020-04-26 06:33:56.682698+00
15	2020-04-26 06:41:06.05543+00
16	2020-04-26 06:42:29.013322+00
17	2020-04-26 06:43:04.238685+00
18	2020-04-26 06:45:50.568024+00
19	2020-04-26 06:46:09.940526+00
20	2020-04-26 06:46:26.804821+00
21	2020-04-26 06:46:37.030315+00
22	2020-04-26 06:55:24.319552+00
23	2020-04-26 06:55:40.129206+00
24	2020-04-26 07:14:40.555008+00
25	2020-04-26 07:14:49.83191+00
26	2020-04-26 07:19:44.834401+00
27	2020-04-26 07:21:00.76623+00
28	2020-04-26 07:21:08.657259+00
29	2020-04-26 07:21:56.391274+00
30	2020-04-26 07:30:40.376705+00
31	2020-04-26 07:30:59.680851+00
32	2020-04-26 07:35:52.490482+00
33	2020-04-26 07:37:31.89829+00
34	2020-04-26 07:37:39.61279+00
35	2020-04-26 07:47:09.550945+00
36	2020-04-26 07:50:18.066809+00
37	2020-04-26 07:51:15.371662+00
38	2020-04-26 07:51:22.208838+00
39	2020-04-26 07:51:33.614554+00
40	2020-04-26 07:54:25.344247+00
41	2020-04-26 07:55:57.918023+00
42	2020-04-26 07:58:34.160858+00
43	2020-04-26 07:59:00.10858+00
44	2020-04-26 07:59:49.220456+00
45	2020-04-26 08:02:52.642986+00
46	2020-04-26 08:04:19.012108+00
47	2020-04-26 08:04:41.821479+00
48	2020-04-26 08:08:12.06376+00
49	2020-04-26 08:10:15.587319+00
50	2020-04-26 08:11:34.25013+00
51	2020-04-26 08:11:52.739887+00
52	2020-04-26 08:12:10.263091+00
53	2020-04-26 08:14:02.97083+00
54	2020-04-26 08:21:07.718639+00
55	2020-04-26 08:21:25.512637+00
56	2020-04-26 08:21:40.643674+00
57	2020-04-26 08:22:01.30221+00
58	2020-04-26 08:22:36.45094+00
59	2020-04-26 08:23:42.866586+00
60	2020-04-26 08:24:34.660178+00
61	2020-04-26 08:25:28.495942+00
62	2020-04-26 08:30:08.230183+00
63	2020-04-26 08:31:25.00759+00
64	2020-04-26 08:39:57.792702+00
65	2020-04-26 08:40:38.718579+00
66	2020-04-26 08:51:35.686574+00
67	2020-04-26 09:06:46.627923+00
68	2020-04-26 09:07:01.901833+00
69	2020-04-26 09:36:35.038042+00
70	2020-04-26 09:36:39.410945+00
71	2020-04-26 09:36:45.589521+00
72	2020-04-26 09:36:48.632102+00
73	2020-04-26 09:40:02.991385+00
74	2020-04-26 09:42:02.125177+00
75	2020-04-26 09:42:06.346526+00
76	2020-04-26 09:47:54.832379+00
77	2020-04-26 18:30:43.109532+00
78	2020-04-26 21:17:12.310836+00
79	2020-06-03 19:05:50.977648+00
80	2020-06-03 20:29:24.974709+00
81	2020-06-03 21:54:27.463188+00
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.orders ("orderId", "cartId", name, "creditCard", "shippingAddress", "createdAt") FROM stdin;
1	79	Steven Tran	123	123	2020-06-03 21:54:14.905898+00
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products ("productId", name, price, image, "shortDescription", "longDescription", madewith, "imageDetail") FROM stdin;
3	Ice Cream	1999	images/black.jpg	I Scream | You Scream	Lorem ipsum dolor amet fashion axe pour-over jianbing, adaptogen waistcoat tacos master cleanse pitchfork next level. Thundercats pour-over chartreuse 90's. Master cleanse hot chicken ennui offal. Freegan slow-carb offal hell of. Umami polaroid wolf slow-carb next level. Gentrify cardigan seitan, kombucha tacos chambray roof party typewriter man braid. Tote bag lo-fi hell of chia fam hammock\\n.Aesthetic photo booth la croix, vaporware leggings biodiesel man braid tumeric skateboard tousled slow-carb four dollar toast synth pabst pickled. Typewriter church-key chia slow-carb vice gochujang actually. Shoreditch austin woke hot chicken, single-origin coffee ugh affogato four loko green juice. Migas iPhone four dollar toast mustache.	Egyptian Cotton	images/black-detail.jpg
1	BB-8	1999	images/maroon.jpg	One Good Rolly Boy	Lorem ipsum dolor amet fashion axe pour-over jianbing, adaptogen waistcoat tacos master cleanse pitchfork next level. Thundercats pour-over chartreuse 90's. Master cleanse hot chicken ennui offal. Freegan slow-carb offal hell of. Umami polaroid wolf slow-carb next level. Gentrify cardigan seitan, kombucha tacos chambray roof party typewriter man braid. Tote bag lo-fi hell of chia fam hammock\\n.Aesthetic photo booth la croix, vaporware leggings biodiesel man braid tumeric skateboard tousled slow-carb four dollar toast synth pabst pickled. Typewriter church-key chia slow-carb vice gochujang actually. Shoreditch austin woke hot chicken, single-origin coffee ugh affogato four loko green juice. Migas iPhone four dollar toast mustache.	Egyptian Cotton	images/maroon-detail.jpg
2	Olive the Bulbasaur	1999	images/red.jpg	A Derpy Bulbasaur named "Olive"	Lorem ipsum dolor amet fashion axe pour-over jianbing, adaptogen waistcoat tacos master cleanse pitchfork next level. Thundercats pour-over chartreuse 90's. Master cleanse hot chicken ennui offal. Freegan slow-carb offal hell of. Umami polaroid wolf slow-carb next level. Gentrify cardigan seitan, kombucha tacos chambray roof party typewriter man braid. Tote bag lo-fi hell of chia fam hammock\\n.Aesthetic photo booth la croix, vaporware leggings biodiesel man braid tumeric skateboard tousled slow-carb four dollar toast synth pabst pickled. Typewriter church-key chia slow-carb vice gochujang actually. Shoreditch austin woke hot chicken, single-origin coffee ugh affogato four loko green juice. Migas iPhone four dollar toast mustache.	Egyptian Cotton	images/red-detail.jpg
4	Droplet the Squirtle	1999	images/yellow.jpg	A Bubbly Squirtle named "Droplet"	Lorem ipsum dolor amet fashion axe pour-over jianbing, adaptogen waistcoat tacos master cleanse pitchfork next level. Thundercats pour-over chartreuse 90's. Master cleanse hot chicken ennui offal. Freegan slow-carb offal hell of. Umami polaroid wolf slow-carb next level. Gentrify cardigan seitan, kombucha tacos chambray roof party typewriter man braid. Tote bag lo-fi hell of chia fam hammock\\n.Aesthetic photo booth la croix, vaporware leggings biodiesel man braid tumeric skateboard tousled slow-carb four dollar toast synth pabst pickled. Typewriter church-key chia slow-carb vice gochujang actually. Shoreditch austin woke hot chicken, single-origin coffee ugh affogato four loko green juice. Migas iPhone four dollar toast mustache.	Egyptian Cotton	images/yellow-detail.jpg
6	Go-Go Meerkat	1999	images/white.jpg	A meerkat following its dreams	Lorem ipsum dolor amet fashion axe pour-over jianbing, adaptogen waistcoat tacos master cleanse pitchfork next level. Thundercats pour-over chartreuse 90's. Master cleanse hot chicken ennui offal. Freegan slow-carb offal hell of. Umami polaroid wolf slow-carb next level. Gentrify cardigan seitan, kombucha tacos chambray roof party typewriter man braid. Tote bag lo-fi hell of chia fam hammock\\n.Aesthetic photo booth la croix, vaporware leggings biodiesel man braid tumeric skateboard tousled slow-carb four dollar toast synth pabst pickled. Typewriter church-key chia slow-carb vice gochujang actually. Shoreditch austin woke hot chicken, single-origin coffee ugh affogato four loko green juice. Migas iPhone four dollar toast mustache.	Egyptian Cotton	images/white-detail.jpg
5	Full-Stack Burgers	1999	images/navy-blue.jpg	Epic Code | Epic Food | Epic Friends	Lorem ipsum dolor amet fashion axe pour-over jianbing, adaptogen waistcoat tacos master cleanse pitchfork next level. Thundercats pour-over chartreuse 90's. Master cleanse hot chicken ennui offal. Freegan slow-carb offal hell of. Umami polaroid wolf slow-carb next level. Gentrify cardigan seitan, kombucha tacos chambray roof party typewriter man braid. Tote bag lo-fi hell of chia fam hammock\\n.Aesthetic photo booth la croix, vaporware leggings biodiesel man braid tumeric skateboard tousled slow-carb four dollar toast synth pabst pickled. Typewriter church-key chia slow-carb vice gochujang actually. Shoreditch austin woke hot chicken, single-origin coffee ugh affogato four loko green juice. Migas iPhone four dollar toast mustache.	Egyptian Cotton	images/navy-blue-detail.jpg
\.


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."cartItems_cartItemId_seq"', 141, true);


--
-- Name: carts_cartId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."carts_cartId_seq"', 81, true);


--
-- Name: orders_orderId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."orders_orderId_seq"', 1, true);


--
-- Name: products_productId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."products_productId_seq"', 1, false);


--
-- Name: cartItems cartItems_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems"
    ADD CONSTRAINT "cartItems_pkey" PRIMARY KEY ("cartItemId");


--
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY ("cartId");


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY ("orderId");


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY ("productId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

