--
-- PostgreSQL database dump
--

-- Dumped from database version 16.9 (63f4182)
-- Dumped by pg_dump version 16.9

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admin_users; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.admin_users (
    id integer NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    password_hash text NOT NULL,
    role text DEFAULT 'staff'::text,
    is_active boolean DEFAULT true,
    last_login timestamp without time zone,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.admin_users OWNER TO neondb_owner;

--
-- Name: admin_users_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.admin_users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.admin_users_id_seq OWNER TO neondb_owner;

--
-- Name: admin_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.admin_users_id_seq OWNED BY public.admin_users.id;


--
-- Name: contact_messages; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.contact_messages (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    phone text,
    subject text,
    message text NOT NULL,
    status text DEFAULT 'new'::text,
    priority text DEFAULT 'normal'::text,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    reply text
);


ALTER TABLE public.contact_messages OWNER TO neondb_owner;

--
-- Name: contact_messages_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.contact_messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.contact_messages_id_seq OWNER TO neondb_owner;

--
-- Name: contact_messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.contact_messages_id_seq OWNED BY public.contact_messages.id;


--
-- Name: event_bookings; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.event_bookings (
    id integer NOT NULL,
    event_id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    phone text,
    guests integer DEFAULT 1,
    total_price real,
    status text DEFAULT 'pending'::text,
    special_requests text,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.event_bookings OWNER TO neondb_owner;

--
-- Name: event_bookings_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.event_bookings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.event_bookings_id_seq OWNER TO neondb_owner;

--
-- Name: event_bookings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.event_bookings_id_seq OWNED BY public.event_bookings.id;


--
-- Name: events; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.events (
    id integer NOT NULL,
    title text NOT NULL,
    description text,
    title_de text,
    title_en text,
    description_de text,
    description_en text,
    date text,
    start_time text,
    end_time text,
    capacity integer,
    current_bookings integer DEFAULT 0,
    price real,
    image_url text,
    is_active boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.events OWNER TO neondb_owner;

--
-- Name: events_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.events_id_seq OWNER TO neondb_owner;

--
-- Name: events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.events_id_seq OWNED BY public.events.id;


--
-- Name: feedbacks; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.feedbacks (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    rating integer NOT NULL,
    comment text NOT NULL,
    status text DEFAULT 'pending'::text,
    is_public boolean DEFAULT false,
    reservation_id integer,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.feedbacks OWNER TO neondb_owner;

--
-- Name: feedbacks_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.feedbacks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.feedbacks_id_seq OWNER TO neondb_owner;

--
-- Name: feedbacks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.feedbacks_id_seq OWNED BY public.feedbacks.id;


--
-- Name: gallery; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.gallery (
    id integer NOT NULL,
    image_url text NOT NULL,
    description text,
    alt text,
    category text,
    is_active boolean DEFAULT true,
    sort_order integer DEFAULT 0,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.gallery OWNER TO neondb_owner;

--
-- Name: gallery_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.gallery_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.gallery_id_seq OWNER TO neondb_owner;

--
-- Name: gallery_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.gallery_id_seq OWNED BY public.gallery.id;


--
-- Name: menu_items; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.menu_items (
    id integer NOT NULL,
    title text NOT NULL,
    description text,
    price real NOT NULL,
    category text NOT NULL,
    is_available boolean DEFAULT true,
    title_de text,
    title_en text,
    description_de text,
    description_en text,
    category_de text,
    category_en text,
    allergens text,
    image_url text,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.menu_items OWNER TO neondb_owner;

--
-- Name: menu_items_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.menu_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.menu_items_id_seq OWNER TO neondb_owner;

--
-- Name: menu_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.menu_items_id_seq OWNED BY public.menu_items.id;


--
-- Name: reservations; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.reservations (
    id integer NOT NULL,
    name text NOT NULL,
    phone text NOT NULL,
    email text,
    date text NOT NULL,
    "time" text NOT NULL,
    guests integer NOT NULL,
    status text DEFAULT 'pending'::text,
    notes text,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.reservations OWNER TO neondb_owner;

--
-- Name: reservations_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.reservations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reservations_id_seq OWNER TO neondb_owner;

--
-- Name: reservations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.reservations_id_seq OWNED BY public.reservations.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.sessions (
    sid character varying NOT NULL,
    sess jsonb NOT NULL,
    expire timestamp without time zone NOT NULL
);


ALTER TABLE public.sessions OWNER TO neondb_owner;

--
-- Name: users; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.users (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    email character varying,
    first_name character varying,
    last_name character varying,
    profile_image_url character varying,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.users OWNER TO neondb_owner;

--
-- Name: admin_users id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.admin_users ALTER COLUMN id SET DEFAULT nextval('public.admin_users_id_seq'::regclass);


--
-- Name: contact_messages id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.contact_messages ALTER COLUMN id SET DEFAULT nextval('public.contact_messages_id_seq'::regclass);


--
-- Name: event_bookings id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.event_bookings ALTER COLUMN id SET DEFAULT nextval('public.event_bookings_id_seq'::regclass);


--
-- Name: events id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.events ALTER COLUMN id SET DEFAULT nextval('public.events_id_seq'::regclass);


--
-- Name: feedbacks id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.feedbacks ALTER COLUMN id SET DEFAULT nextval('public.feedbacks_id_seq'::regclass);


--
-- Name: gallery id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.gallery ALTER COLUMN id SET DEFAULT nextval('public.gallery_id_seq'::regclass);


--
-- Name: menu_items id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.menu_items ALTER COLUMN id SET DEFAULT nextval('public.menu_items_id_seq'::regclass);


--
-- Name: reservations id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.reservations ALTER COLUMN id SET DEFAULT nextval('public.reservations_id_seq'::regclass);


--
-- Data for Name: admin_users; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.admin_users (id, username, email, password_hash, role, is_active, last_login, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: contact_messages; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.contact_messages (id, name, email, phone, subject, message, status, priority, created_at, updated_at, reply) FROM stdin;
1	Test User	test@example.com	\N	Test Subject	Test message for Section 4-2 completion	new	normal	2025-09-29 00:33:56.656	2025-09-29 00:33:57.073706	\N
2	Test	test@test.com	\N	Test	Test	new	normal	2025-09-29 01:42:36.986	2025-09-29 01:42:37.439513	\N
3	Test	test@test.com	\N	Test	Test	new	normal	2025-09-29 01:42:57.039	2025-09-29 01:42:57.160356	\N
\.


--
-- Data for Name: event_bookings; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.event_bookings (id, event_id, name, email, phone, guests, total_price, status, special_requests, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.events (id, title, description, title_de, title_en, description_de, description_en, date, start_time, end_time, capacity, current_bookings, price, image_url, is_active, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: feedbacks; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.feedbacks (id, name, email, rating, comment, status, is_public, reservation_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: gallery; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.gallery (id, image_url, description, alt, category, is_active, sort_order, created_at, updated_at) FROM stdin;
1	/uploads/gallery/test1.jpg	Beautiful Italian cuisine	Delicious pasta dish	food	t	1	2025-09-29 16:32:26.400529	2025-09-29 16:32:26.400529
2	/uploads/gallery/test2.jpg	Restaurant interior	Cozy dining room	interior	t	2	2025-09-29 16:32:26.400529	2025-09-29 16:32:26.400529
\.


--
-- Data for Name: menu_items; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.menu_items (id, title, description, price, category, is_available, title_de, title_en, description_de, description_en, category_de, category_en, allergens, image_url, created_at, updated_at) FROM stdin;
1	Vitello Tonnato	Thin slices of veal in tuna cream	16.55	Appetizers	t	Vitello Tonnato	Vitello Tonnato	Dünne Kalbsschnitzel in Thunfisch-Creme	Thin slices of veal in tuna cream	Vorspeisen	Appetizers	D,G	\N	2025-09-29 16:25:17.535286	2025-09-29 16:25:17.535286
2	Beef Carpaccio	On rocket salad bed with parmesan flakes	16.55	Appetizers	t	Carpaccio vom Rind	Beef Carpaccio	Auf Rucola Bett mit Parmesanflocken	On rocket salad bed with parmesan flakes	Vorspeisen	Appetizers	G,H	\N	2025-09-29 16:25:17.565039	2025-09-29 16:25:17.565039
3	Ziegenkäse	Auf Rote-Bete-Carpaccio mit Walnüssen und Honig	16.5	Vorspeisen	t	Ziegenkäse	Goat Cheese	Auf Rote-Bete-Carpaccio mit Walnüssen und Honig	On beetroot carpaccio with walnuts and honey	Vorspeisen	Appetizers	G,H	\N	2025-09-29 16:25:17.591872	2025-09-29 16:25:17.591872
4	Pulpo gegrillt	Gegrillt	18.5	Vorspeisen	t	Pulpo gegrillt	Grilled Pulpo	Gegrillt	Grilled pulpo	Vorspeisen	Appetizers	D	\N	2025-09-29 16:25:17.612979	2025-09-29 16:25:17.612979
5	Antipasto Misto	Nach Art des Hauses für 1 Person	15.5	Vorspeisen	t	Antipasto Misto	Mixed Antipasto	Nach Art des Hauses für 1 Person	House style for 1 person	Vorspeisen	Appetizers	G,H	\N	2025-09-29 16:25:17.635315	2025-09-29 16:25:17.635315
6	Baby Calamari	Gegrillt mit Rucola	17.5	Vorspeisen	t	Baby Calamari	Baby Calamari	Gegrillt mit Rucola	Grilled with arugula	Vorspeisen	Appetizers	D	\N	2025-09-29 16:25:17.657733	2025-09-29 16:25:17.657733
7	Lachs-Tartar	Mit Schnittlauch, Avocado und Gurke	17.5	Vorspeisen	t	Lachs-Tartar	Salmon Tartar	Mit Schnittlauch, Avocado und Gurke	With chives, avocado and cucumber	Vorspeisen	Appetizers	D	\N	2025-09-29 16:25:17.680602	2025-09-29 16:25:17.680602
8	Parmigiano Auberginen-Auflauf	Parmigiano Auberginen-Auflauf	16.5	Vorspeisen	t	Parmigiano Auberginen-Auflauf	Parmigiano Eggplant Casserole	Parmigiano Auberginen-Auflauf	Parmigiano eggplant casserole	Vorspeisen	Appetizers	G	\N	2025-09-29 16:25:17.705199	2025-09-29 16:25:17.705199
9	Tomatensuppe	Mit Basilikumschaum	8.5	Suppen	t	Tomatensuppe	Tomato Soup	Mit Basilikumschaum	With basil foam	Suppen	Soups		\N	2025-09-29 16:25:17.728452	2025-09-29 16:25:17.728452
10	Toskanische Gemüsesuppe	Mit Bohnen	8.5	Suppen	t	Toskanische Gemüsesuppe	Tuscan Vegetable Soup	Mit Bohnen	With beans	Suppen	Soups	G	\N	2025-09-29 16:25:17.752254	2025-09-29 16:25:17.752254
11	Fischsuppe	Fischsuppe	14.5	Suppen	t	Fischsuppe	Fish Soup	Fischsuppe	Fish soup	Suppen	Soups	D	\N	2025-09-29 16:25:17.775136	2025-09-29 16:25:17.775136
12	Italienischer Brotsalat (Panzanella)	Mit Tomaten, Gurken, Zwiebeln, Oliven, Kapern und Basilikum	12.5	Salate	t	Italienischer Brotsalat (Panzanella)	Italian Bread Salad (Panzanella)	Mit Tomaten, Gurken, Zwiebeln, Oliven, Kapern und Basilikum	With tomatoes, cucumbers, onions, olives, capers and basil	Salate	Salads	A,G	\N	2025-09-29 16:25:17.798224	2025-09-29 16:25:17.798224
13	Büffelmozzarella	Mit Cherrytomaten und Basilikum	12.5	Salate	t	Büffelmozzarella	Buffalo Mozzarella	Mit Cherrytomaten und Basilikum	With cherry tomatoes and basil	Salate	Salads	G	\N	2025-09-29 16:25:17.821094	2025-09-29 16:25:17.821094
14	Tomatensalat	Mit Avocado und rote Zwiebel	13.5	Salate	t	Tomatensalat	Tomato Salad	Mit Avocado und rote Zwiebel	With avocado and red onion	Salate	Salads	G	\N	2025-09-29 16:25:17.843608	2025-09-29 16:25:17.843608
15	Cherrytomaten mit Burrata	Cherrytomaten mit Burrata	16.5	Salate	t	Cherrytomaten mit Burrata	Cherry Tomatoes with Burrata	Cherrytomaten mit Burrata	Cherry tomatoes with burrata	Salate	Salads	G,H	\N	2025-09-29 16:25:17.86678	2025-09-29 16:25:17.86678
16	Insalata Scampi	Gemischter Salat mit Scampi und Fenchel	17.5	Salate	t	Insalata Scampi	Scampi Salad	Gemischter Salat mit Scampi und Fenchel	Mixed salad with scampi and fennel	Salate	Salads	D,G,H	\N	2025-09-29 16:25:17.890053	2025-09-29 16:25:17.890053
17	Insalata Filetto	Gemischter Salat mit Filetstreifen und Parmesanflocken	18.5	Salate	t	Insalata Filetto	Fillet Salad	Gemischter Salat mit Filetstreifen und Parmesanflocken	Mixed salad with fillet strips and parmesan flakes	Salate	Salads	G	\N	2025-09-29 16:25:17.912488	2025-09-29 16:25:17.912488
18	Bruschetta	4 Stück	7.5	Pizza	t	Bruschetta	Bruschetta	4 Stück	4 pieces	Pizza	Pizza	A,G	\N	2025-09-29 16:25:17.933987	2025-09-29 16:25:17.933987
19	Focaccia	Mit Rosmarin	7.5	Pizza	t	Focaccia	Focaccia	Mit Rosmarin	With rosemary	Pizza	Pizza	A,G	\N	2025-09-29 16:25:17.956382	2025-09-29 16:25:17.956382
20	Focaccia Spezial	Mit Tomaten, Parmigiano, Rucola und Aceto Creme	13.5	Pizza	t	Focaccia Spezial	Focaccia Special	Mit Tomaten, Parmigiano, Rucola und Aceto Creme	With tomatoes, parmigiano, rocket and aceto cream	Pizza	Pizza	A,G,L	\N	2025-09-29 16:25:17.978008	2025-09-29 16:25:17.978008
21	Pizza Tonno	Mit Zwiebeln	14.5	Pizza	t	Pizza Tonno	Pizza Tuna	Mit Zwiebeln	With onions	Pizza	Pizza	A,D,G	\N	2025-09-29 16:25:18.00041	2025-09-29 16:25:18.00041
22	Pizza Diavola	Mit scharfer Salami	14.5	Pizza	t	Pizza Diavola	Pizza Diavola	Mit scharfer Salami	With spicy salami	Pizza	Pizza	A,G	\N	2025-09-29 16:25:18.023709	2025-09-29 16:25:18.023709
23	Pizza Artischocken	Mit Artischocken und scharfer Salami	15.5	Pizza	t	Pizza Artischocken	Pizza Artichokes	Mit Artischocken und scharfer Salami	With artichokes and spicy salami	Pizza	Pizza	A,G	\N	2025-09-29 16:25:18.046306	2025-09-29 16:25:18.046306
24	Pizza Gorgonzola	Mit Gorgonzolakäse und Spinat	15.5	Pizza	t	Pizza Gorgonzola	Pizza Gorgonzola	Mit Gorgonzolakäse und Spinat	With gorgonzola cheese and spinach	Pizza	Pizza	A,G	\N	2025-09-29 16:25:18.068973	2025-09-29 16:25:18.068973
25	Pizza Stracetti di Mozzarella	Mit Rucola, Cherrytomaten und Acetocreme	16.5	Pizza	t	Pizza Stracetti di Mozzarella	Pizza Stracetti di Mozzarella	Mit Rucola, Cherrytomaten und Acetocreme	With rocket, cherry tomatoes and aceto cream	Pizza	Pizza	A,G,L	\N	2025-09-29 16:25:18.091655	2025-09-29 16:25:18.091655
26	Pizza Burrata	Mit Burrata, Cherrytomaten und Pesto	17	Pizza	t	Pizza Burrata	Pizza Burrata	Mit Burrata, Cherrytomaten und Pesto	With burrata, cherry tomatoes and pesto	Pizza	Pizza	A,G,H	\N	2025-09-29 16:25:18.117222	2025-09-29 16:25:18.117222
27	Pizza Salsiccia	Mit ital. Salami, Brokkoli, Cherrytomaten und Rucola	17.5	Pizza	t	Pizza Salsiccia	Pizza Salsiccia	Mit ital. Salami, Brokkoli, Cherrytomaten und Rucola	With Italian salami, broccoli, cherry tomatoes and rocket	Pizza	Pizza	A,G	\N	2025-09-29 16:25:18.14146	2025-09-29 16:25:18.14146
28	Pizza Parma	Mit Schinken, Rucola und Parmesanflocken	17.5	Pizza	t	Pizza Parma	Pizza Parma	Mit Schinken, Rucola und Parmesanflocken	With ham, rocket and parmesan flakes	Pizza	Pizza	A,G	\N	2025-09-29 16:25:18.163938	2025-09-29 16:25:18.163938
29	Pizza Bresaola	Mit Bresaola, Rucola und Parmesanflocken	18.5	Pizza	t	Pizza Bresaola	Pizza Bresaola	Mit Bresaola, Rucola und Parmesanflocken	With bresaola, rocket and parmesan flakes	Pizza	Pizza	A,G	\N	2025-09-29 16:25:18.186265	2025-09-29 16:25:18.186265
30	Pizza Trüffel	Mit Piemont-Trüffel und Trüffelcreme	19.5	Pizza	t	Pizza Trüffel	Pizza Truffle	Mit Piemont-Trüffel und Trüffelcreme	With Piedmont truffles and truffle cream	Pizza	Pizza	A,G	\N	2025-09-29 16:25:18.208651	2025-09-29 16:25:18.208651
31	Pizza Scampi	Mit Creme Fraiche	18.5	Pizza	t	Pizza Scampi	Pizza Scampi	Mit Creme Fraiche	With creme fraiche	Pizza	Pizza	A,D,G	\N	2025-09-29 16:25:18.230818	2025-09-29 16:25:18.230818
32	Spaghetti Aglio e Olio	Mit Knoblauch	12.5	Pasta	t	Spaghetti Aglio e Olio	Spaghetti Aglio e Olio	Mit Knoblauch	With garlic	Pasta	Pasta	A	\N	2025-09-29 16:25:18.253458	2025-09-29 16:25:18.253458
33	Spaghetti Carbonara	Mit Speck und Eigelb	13.5	Pasta	t	Spaghetti Carbonara	Spaghetti Carbonara	Mit Speck und Eigelb	With bacon and egg	Pasta	Pasta	A,G	\N	2025-09-29 16:25:18.281035	2025-09-29 16:25:18.281035
34	Penne Arrabbiata	Mit Mozzarella	15.5	Pasta	t	Penne Arrabbiata	Penne Arrabbiata	Mit Mozzarella	Spicy penne with mozzarella	Pasta	Pasta	A,G	\N	2025-09-29 16:25:18.303424	2025-09-29 16:25:18.303424
66	Tiramisu Originale	Hausgemachtes Tiramisu	8.5	Desserts	t	Tiramisu Originale	Homemade Tiramisu	Hausgemachtes Tiramisu	Homemade tiramisu	Desserts	Desserts	G	\N	2025-09-29 16:25:19.023707	2025-09-29 16:25:19.023707
35	Penne Pollo	Mit Hähnchenbruststreifen und Champignons in Sahnesauce	16.5	Pasta	t	Penne Pollo	Penne Pollo	Mit Hähnchenbruststreifen und Champignons in Sahnesauce	With chicken breast strips and mushrooms in cream sauce	Pasta	Pasta	A,G	\N	2025-09-29 16:25:18.325626	2025-09-29 16:25:18.325626
36	Pappardelle	Mit Kalbsragout, Rucola und Parmesanflocken in eigener Sauce	17.5	Pasta	t	Pappardelle	Pappardelle	Mit Kalbsragout, Rucola und Parmesanflocken in eigener Sauce	With veal ragout, rocket and parmesan flakes in own sauce	Pasta	Pasta	A,G	\N	2025-09-29 16:25:18.350928	2025-09-29 16:25:18.350928
37	Paccheri	Mit Meeresfrüchten in Weißweinsauce	17.5	Pasta	t	Paccheri	Paccheri	Mit Meeresfrüchten in Weißweinsauce	With seafood in white wine sauce	Pasta	Pasta	A,D,L	\N	2025-09-29 16:25:18.373442	2025-09-29 16:25:18.373442
38	Linguine	Mit Scampi und Fenchel in Weißwein-Cherrytomatensauce	19.5	Pasta	t	Linguine	Linguine	Mit Scampi und Fenchel in Weißwein-Cherrytomatensauce	With scampi and fennel in white wine-cherry tomato sauce	Pasta	Pasta	A,D,L	\N	2025-09-29 16:25:18.396853	2025-09-29 16:25:18.396853
39	Orecchiette	Mit Salsiccia und Brokkoli in eigenem Sud	18.5	Pasta	t	Orecchiette	Orecchiette	Mit Salsiccia und Brokkoli in eigenem Sud	With salsiccia and broccoli in own broth	Pasta	Pasta	A,G	\N	2025-09-29 16:25:18.418163	2025-09-29 16:25:18.418163
40	Tagliatelle	Mit Lachs und Zucchini in Hummersauce	18.5	Pasta	t	Tagliatelle	Tagliatelle	Mit Lachs und Zucchini in Hummersauce	With salmon and zucchini in lobster sauce	Pasta	Pasta	A,D	\N	2025-09-29 16:25:18.440789	2025-09-29 16:25:18.440789
41	Schwarze Linguine	Mit Vongole in Weißweinsauce	18.5	Pasta	t	Schwarze Linguine	Black Linguine	Mit Vongole in Weißweinsauce	With vongole in white wine sauce	Pasta	Pasta	A,D,L	\N	2025-09-29 16:25:18.464312	2025-09-29 16:25:18.464312
42	Penne mit Filetstreifen	Mit Filetstreifen und Champignons in Sahnesauce	18.5	Pasta	t	Penne mit Filetstreifen	Penne with Fillet Strips	Mit Filetstreifen und Champignons in Sahnesauce	With fillet strips and mushrooms in cream sauce	Pasta	Pasta	A,G	\N	2025-09-29 16:25:18.48653	2025-09-29 16:25:18.48653
43	Tagliolini	In cremiger Sauce mit Piemont Trüffel	23.5	Pasta	t	Tagliolini	Tagliolini	In cremiger Sauce mit Piemont Trüffel	In creamy sauce with Piedmont truffles	Pasta	Pasta	A,G	\N	2025-09-29 16:25:18.509639	2025-09-29 16:25:18.509639
44	Gnocchi	Gefüllt mit Ziegenkäse in Trüffelcreme	21.5	Pasta	t	Gnocchi	Gnocchi	Gefüllt mit Ziegenkäse in Trüffelcreme	Filled with goat cheese in truffle cream	Pasta	Pasta	A,G	\N	2025-09-29 16:25:18.531935	2025-09-29 16:25:18.531935
45	Lasagne Classic	Mit Rinderhackfleisch und Bechamelsauce	16.5	Pasta	t	Lasagne Classic	Lasagne Classic	Mit Rinderhackfleisch und Bechamelsauce	With minced beef and bechamel sauce	Pasta	Pasta	A,G	\N	2025-09-29 16:25:18.554834	2025-09-29 16:25:18.554834
46	Risotto mit Meeresfrüchten	Mit Meeresfrüchten	19.5	Pasta	t	Risotto mit Meeresfrüchten	Seafood Risotto	Mit Meeresfrüchten	With seafood	Pasta	Pasta	D,G	\N	2025-09-29 16:25:18.57741	2025-09-29 16:25:18.57741
47	Risotto mit Steinpilzen	Mit Steinpilzen	19.5	Pasta	t	Risotto mit Steinpilzen	Risotto with Porcini Mushrooms	Mit Steinpilzen	With porcini mushrooms	Pasta	Pasta	G	\N	2025-09-29 16:25:18.6001	2025-09-29 16:25:18.6001
48	Risotto mit Trüffel	Mit Trüffel	21.5	Pasta	t	Risotto mit Trüffel	Truffle Risotto	Mit Trüffel	With truffle	Pasta	Pasta	G	\N	2025-09-29 16:25:18.622465	2025-09-29 16:25:18.622465
49	Risotto mit Scampi und Safran	Mit Scampi und Safran	22.5	Pasta	t	Risotto mit Scampi und Safran	Scampi Saffron Risotto	Mit Scampi und Safran	With scampi and saffron	Pasta	Pasta	D,G	\N	2025-09-29 16:25:18.644815	2025-09-29 16:25:18.644815
50	Doradenfilet	Mit Oliven, Cherrytomaten und Kräuter dazu Tagesgemüse	24.5	Fisch	t	Doradenfilet	Sea Bream Fillet	Mit Oliven, Cherrytomaten und Kräuter dazu Tagesgemüse	Grilled with olives, cherry tomatoes and herbs with vegetables of the day	Fisch	Fish	D	\N	2025-09-29 16:25:18.667558	2025-09-29 16:25:18.667558
51	Zanderfilet	Gegrillt in Zitronen-Buttersauce dazu Tagesgemüse	24.5	Fisch	t	Zanderfilet	Pike-Perch Fillet	Gegrillt in Zitronen-Buttersauce dazu Tagesgemüse	Grilled in lemon butter sauce with vegetables of the day	Fisch	Fish	D,G	\N	2025-09-29 16:25:18.689726	2025-09-29 16:25:18.689726
52	Lachs	Gegrillt in Zitronen-Buttersauce dazu Tagesgemüse	26.5	Fisch	t	Lachs	Salmon	Gegrillt in Zitronen-Buttersauce dazu Tagesgemüse	Grilled in lemon butter sauce with vegetables of the day	Fisch	Fish	D,G	\N	2025-09-29 16:25:18.711043	2025-09-29 16:25:18.711043
53	Scampi	Gegrillt in Safransauce dazu Tagesgemüse	29.5	Fisch	t	Scampi	Scampi	Gegrillt in Safransauce dazu Tagesgemüse	Grilled in saffron sauce with vegetables of the day	Fisch	Fish	D	\N	2025-09-29 16:25:18.733501	2025-09-29 16:25:18.733501
54	Kalbsschnitzel	Paniert, dazu Tagesgemüse	25.5	Fleisch	t	Kalbsschnitzel	Veal Schnitzel	Paniert, dazu Tagesgemüse	Breaded, with vegetables of the day	Fleisch	Meat	A,G	\N	2025-09-29 16:25:18.755922	2025-09-29 16:25:18.755922
55	Kalbsmedaillons in Honig-Senfsauce	In Honig-Senfsauce dazu Tagesgemüse	26.5	Fleisch	t	Kalbsmedaillons in Honig-Senfsauce	Veal Medallions in Honey-Mustard Sauce	In Honig-Senfsauce dazu Tagesgemüse	In honey-mustard sauce with vegetables of the day	Fleisch	Meat	G	\N	2025-09-29 16:25:18.776938	2025-09-29 16:25:18.776938
56	Kalbsmedaillons in Marsalasauce	In Marsalasauce dazu Tagesgemüse	26.5	Fleisch	t	Kalbsmedaillons in Marsalasauce	Veal Medallions in Marsala Sauce	In Marsalasauce dazu Tagesgemüse	In marsala sauce with vegetables of the day	Fleisch	Meat	G,L	\N	2025-09-29 16:25:18.801455	2025-09-29 16:25:18.801455
57	Kalbs Saltimbocca Alla Romana	In Weißwein-Salbeisauce dazu Tagesgemüse	25.5	Fleisch	t	Kalbs Saltimbocca Alla Romana	Veal Saltimbocca Alla Romana	In Weißwein-Salbeisauce dazu Tagesgemüse	In white wine-sage sauce with vegetables of the day	Fleisch	Meat	G,L	\N	2025-09-29 16:25:18.823749	2025-09-29 16:25:18.823749
58	Rumpsteak mit grüner Pfeffersauce	Mit grüner Pfeffersauce dazu Tagesgemüse	27.5	Fleisch	t	Rumpsteak mit grüner Pfeffersauce	Rump Steak with Green Pepper Sauce	Mit grüner Pfeffersauce dazu Tagesgemüse	With green pepper sauce and vegetables of the day	Fleisch	Meat	G	\N	2025-09-29 16:25:18.845957	2025-09-29 16:25:18.845957
59	Rumpsteak mit Gorgonzolasauce	Mit Gorgonzolasauce dazu Tagesgemüse	27.5	Fleisch	t	Rumpsteak mit Gorgonzolasauce	Rump Steak with Gorgonzola Sauce	Mit Gorgonzolasauce dazu Tagesgemüse	With gorgonzola sauce and vegetables of the day	Fleisch	Meat	G	\N	2025-09-29 16:25:18.868337	2025-09-29 16:25:18.868337
60	Rinderfilet in Rotweinsauce	In Rotweinsauce dazu Tagesgemüse	37.5	Fleisch	t	Rinderfilet in Rotweinsauce	Beef Fillet in Red Wine Sauce	In Rotweinsauce dazu Tagesgemüse	In red wine sauce with vegetables of the day	Fleisch	Meat	G,L	\N	2025-09-29 16:25:18.890327	2025-09-29 16:25:18.890327
61	Rinderfilet in Pfeffersauce	In Pfeffersauce dazu Tagesgemüse	36.5	Fleisch	t	Rinderfilet in Pfeffersauce	Beef Fillet in Pepper Sauce	In Pfeffersauce dazu Tagesgemüse	In pepper sauce with vegetables of the day	Fleisch	Meat	G	\N	2025-09-29 16:25:18.912755	2025-09-29 16:25:18.912755
62	Rinderfilet mit Trüffelpasta	Mit Trüffelpasta	39.5	Fleisch	t	Rinderfilet mit Trüffelpasta	Beef Fillet with Truffle Pasta	Mit Trüffelpasta	With truffle pasta	Fleisch	Meat	G	\N	2025-09-29 16:25:18.9356	2025-09-29 16:25:18.9356
63	Chateau Briand	Für 2 Personen	79.5	Fleisch	t	Chateau Briand	Chateau Briand	Für 2 Personen	For 2 persons	Fleisch	Meat	G	\N	2025-09-29 16:25:18.957531	2025-09-29 16:25:18.957531
64	Ossobuco alla Milanese	Kalbshaxe geschmort mit Safran Risotto	29.5	Fleisch	t	Ossobuco alla Milanese	Ossobuco alla Milanese	Kalbshaxe geschmort mit Safran Risotto	Veal knuckle braised with saffron risotto	Fleisch	Meat	G	\N	2025-09-29 16:25:18.979418	2025-09-29 16:25:18.979418
65	Lammkotelett aus Neuseeland	Mit Tagesgemüse	29.5	Fleisch	t	Lammkotelett aus Neuseeland	Lamb Chop from New Zealand	Mit Tagesgemüse	With vegetables of the day	Fleisch	Meat	G	\N	2025-09-29 16:25:19.001389	2025-09-29 16:25:19.001389
67	Panna cotta mit Waldfrüchten	Panna cotta mit Waldfrüchten	8.5	Desserts	t	Panna cotta mit Waldfrüchten	Panna Cotta with Wild Berries	Panna cotta mit Waldfrüchten	Panna cotta with wildberry sauce	Desserts	Desserts	G	\N	2025-09-29 16:25:19.04633	2025-09-29 16:25:19.04633
68	Creme Brûlée	Creme Brûlée	8.5	Desserts	t	Creme Brûlée	Creme Brulee	Creme Brûlée	Creme brulee	Desserts	Desserts	G	\N	2025-09-29 16:25:19.069188	2025-09-29 16:25:19.069188
69	Tartufo Eis	Tartufo Eis	9.5	Desserts	t	Tartufo Eis	Tartufo Ice Cream	Tartufo Eis	Tartufo ice cream	Desserts	Desserts	G	\N	2025-09-29 16:25:19.092112	2025-09-29 16:25:19.092112
70	Cassata Eis	Cassata Eis	9.5	Desserts	t	Cassata Eis	Cassata Ice Cream	Cassata Eis	Cassata ice cream	Desserts	Desserts	G	\N	2025-09-29 16:25:19.11461	2025-09-29 16:25:19.11461
71	Käse-Mix für 2 Personen	Käse-Mix für 2 Personen	22.5	Käse	t	Käse-Mix für 2 Personen	Cheese Mix for 2 Persons	Käse-Mix für 2 Personen	Cheese mix for 2 persons	Käse	Cheese	G	\N	2025-09-29 16:25:19.13708	2025-09-29 16:25:19.13708
72	Parmigiano Reggiano	Für 1 Person	14.5	Käse	t	Parmigiano Reggiano	Parmigiano Reggiano	Für 1 Person	For 1 person	Käse	Cheese	G	\N	2025-09-29 16:25:19.165159	2025-09-29 16:25:19.165159
73	Gorgonzola mit Honig und Walnüssen	Für 1 Person	12.5	Käse	t	Gorgonzola mit Honig und Walnüssen	Gorgonzola with Honey and Walnuts	Für 1 Person	For 1 person	Käse	Cheese	G,H	\N	2025-09-29 16:25:19.187265	2025-09-29 16:25:19.187265
74	Kaffee	Kaffee	3.2	Heißgetränke	t	Kaffee	Coffee	Kaffee	Coffee	Heißgetränke	Hot Drinks		\N	2025-09-29 16:25:19.209247	2025-09-29 16:25:19.209247
75	Espresso	Espresso	2.9	Heißgetränke	t	Espresso	Espresso	Espresso	Espresso	Heißgetränke	Hot Drinks		\N	2025-09-29 16:25:19.231157	2025-09-29 16:25:19.231157
76	Doppelter Espresso	Doppelter Espresso	4.5	Heißgetränke	t	Doppelter Espresso	Double Espresso	Doppelter Espresso	Double espresso	Heißgetränke	Hot Drinks		\N	2025-09-29 16:25:19.257717	2025-09-29 16:25:19.257717
77	Latte Macchiato	Latte Macchiato	5.5	Heißgetränke	t	Latte Macchiato	Latte Macchiato	Latte Macchiato	Latte macchiato	Heißgetränke	Hot Drinks	G	\N	2025-09-29 16:25:19.278871	2025-09-29 16:25:19.278871
78	Cappuccino	Cappuccino	4.5	Heißgetränke	t	Cappuccino	Cappuccino	Cappuccino	Cappuccino	Heißgetränke	Hot Drinks	G	\N	2025-09-29 16:25:19.301353	2025-09-29 16:25:19.301353
79	Tee	Verschiedene Sorten	4	Heißgetränke	t	Tee	Tea	Verschiedene Sorten	Different varieties	Heißgetränke	Hot Drinks		\N	2025-09-29 16:25:19.324354	2025-09-29 16:25:19.324354
80	San Pellegrino	Mineralwasser still oder medium (0,25l / 0,75l)	3.5	Softdrinks	t	San Pellegrino	San Pellegrino	Mineralwasser still oder medium (0,25l / 0,75l)	Sparkling or still mineral water (0.25l / 0.75l)	Softdrinks	Soft Drinks		\N	2025-09-29 16:25:19.346949	2025-09-29 16:25:19.346949
81	Acqua Panna	Still oder medium (0,25l / 0,75l)	3.5	Softdrinks	t	Acqua Panna	Acqua Panna	Still oder medium (0,25l / 0,75l)	Sparkling or still water (0.25l / 0.75l)	Softdrinks	Soft Drinks		\N	2025-09-29 16:25:19.369685	2025-09-29 16:25:19.369685
82	Coca-Cola	Coca-Cola (0,2l / 0,4l)	3.8	Softdrinks	t	Coca-Cola	Coca-Cola	Coca-Cola (0,2l / 0,4l)	Coca-Cola (0.2l / 0.4l)	Softdrinks	Soft Drinks		\N	2025-09-29 16:25:19.391702	2025-09-29 16:25:19.391702
83	Coca-Cola Light	Coca-Cola Light (0,2l / 0,4l)	3.8	Softdrinks	t	Coca-Cola Light	Coca-Cola Light	Coca-Cola Light (0,2l / 0,4l)	Coca-Cola Light (0.2l / 0.4l)	Softdrinks	Soft Drinks		\N	2025-09-29 16:25:19.41401	2025-09-29 16:25:19.41401
84	Fanta	Fanta (0,2l / 0,4l)	3.8	Softdrinks	t	Fanta	Fanta	Fanta (0,2l / 0,4l)	Fanta (0.2l / 0.4l)	Softdrinks	Soft Drinks		\N	2025-09-29 16:25:19.436524	2025-09-29 16:25:19.436524
85	Spezi	Spezi (0,2l / 0,4l)	3.8	Softdrinks	t	Spezi	Spezi	Spezi (0,2l / 0,4l)	Spezi (0.2l / 0.4l)	Softdrinks	Soft Drinks		\N	2025-09-29 16:25:19.458543	2025-09-29 16:25:19.458543
86	Red Bull Energy Drink	Red Bull Energy Drink (0,25l)	6.5	Softdrinks	t	Red Bull Energy Drink	Red Bull Energy Drink	Red Bull Energy Drink (0,25l)	Red Bull Energy Drink (0.25l)	Softdrinks	Soft Drinks		\N	2025-09-29 16:25:19.481382	2025-09-29 16:25:19.481382
87	Red Bull Sugarfree	Red Bull Sugarfree (0,25l)	6.5	Softdrinks	t	Red Bull Sugarfree	Red Bull Sugarfree	Red Bull Sugarfree (0,25l)	Red Bull Sugarfree (0.25l)	Softdrinks	Soft Drinks		\N	2025-09-29 16:25:19.50354	2025-09-29 16:25:19.50354
88	Apfelsaft	Apfelsaft von Granini (0,2l / 0,4l)	3.5	Fruchtsäfte	t	Apfelsaft	Apple Juice	Apfelsaft von Granini (0,2l / 0,4l)	Apple juice from Granini (0.2l / 0.4l)	Fruchtsäfte	Fruit Juices		\N	2025-09-29 16:25:19.52594	2025-09-29 16:25:19.52594
89	Orangensaft	Orangensaft von Granini (0,2l / 0,4l)	3.5	Fruchtsäfte	t	Orangensaft	Orange Juice	Orangensaft von Granini (0,2l / 0,4l)	Orange juice from Granini (0.2l / 0.4l)	Fruchtsäfte	Fruit Juices		\N	2025-09-29 16:25:19.548021	2025-09-29 16:25:19.548021
90	Kirschnektar	Kirschnektar von Granini (0,2l / 0,4l)	3.5	Fruchtsäfte	t	Kirschnektar	Cherry Nectar	Kirschnektar von Granini (0,2l / 0,4l)	Cherry nectar from Granini (0.2l / 0.4l)	Fruchtsäfte	Fruit Juices		\N	2025-09-29 16:25:19.571169	2025-09-29 16:25:19.571169
91	Tomatensaft	Tomatensaft (0,2l / 0,4l)	3.5	Fruchtsäfte	t	Tomatensaft	Tomato Juice	Tomatensaft (0,2l / 0,4l)	Tomato juice (0.2l / 0.4l)	Fruchtsäfte	Fruit Juices		\N	2025-09-29 16:25:19.593272	2025-09-29 16:25:19.593272
92	Königs Pils vom Fass	Königs Pils vom Fass (0,2l)	4	Bier	t	Königs Pils vom Fass	König's Pils Draft Beer	Königs Pils vom Fass (0,2l)	König's Pils draft beer (0.2l)	Bier	Beer	A	\N	2025-09-29 16:25:19.615646	2025-09-29 16:25:19.615646
93	Königs Pils vom Fass	Königs Pils vom Fass (0,4l)	5.5	Bier	t	Königs Pils vom Fass	König's Pils Draft Beer	Königs Pils vom Fass (0,4l)	König's Pils draft beer (0.4l)	Bier	Beer	A	\N	2025-09-29 16:25:19.637703	2025-09-29 16:25:19.637703
94	Benediktiner Weizen	Benediktiner Weizen (0,5l)	5.5	Bier	t	Benediktiner Weizen	Benediktiner Wheat Beer	Benediktiner Weizen (0,5l)	Benediktiner yeast beer (0.5l)	Bier	Beer	A	\N	2025-09-29 16:25:19.65899	2025-09-29 16:25:19.65899
95	Benediktiner Weizen alkoholfrei	Benediktiner Weizen alkoholfrei (0,5l)	5.5	Bier	t	Benediktiner Weizen alkoholfrei	Benediktiner Wheat Beer Non-Alcoholic	Benediktiner Weizen alkoholfrei (0,5l)	Benediktiner yeast beer non-alcoholic (0.5l)	Bier	Beer	A	\N	2025-09-29 16:25:19.67992	2025-09-29 16:25:19.67992
96	Erdinger Weizenbier Kristall	Erdinger Weizenbier Kristall (0,5l)	6.5	Bier	t	Erdinger Weizenbier Kristall	Erdinger Crystal Wheat Beer	Erdinger Weizenbier Kristall (0,5l)	Erdinger crystal yeast beer (0.5l)	Bier	Beer	A	\N	2025-09-29 16:25:19.702534	2025-09-29 16:25:19.702534
97	Köstritzer Schwarzbier	Köstritzer Schwarzbier (0,33l)	5	Bier	t	Köstritzer Schwarzbier	Köstritzer Dark Beer	Köstritzer Schwarzbier (0,33l)	Köstritzer dark beer (0.33l)	Bier	Beer	A	\N	2025-09-29 16:25:19.724546	2025-09-29 16:25:19.724546
98	Königs Pilsner alkoholfrei	Königs Pilsner alkoholfrei (0,33l)	4.9	Bier	t	Königs Pilsner alkoholfrei	König's Pilsner Non-Alcoholic	Königs Pilsner alkoholfrei (0,33l)	König's Pilsner non-alcoholic beer (0.33l)	Bier	Beer	A	\N	2025-09-29 16:25:19.746575	2025-09-29 16:25:19.746575
99	Primitivo	Primitivo Rotwein (0,2l)	7.5	Rotwein	t	Primitivo	Primitivo	Primitivo Rotwein (0,2l)	Primitivo red wine (0.2l)	Rotwein	Red Wine	L	\N	2025-09-29 16:25:19.768473	2025-09-29 16:25:19.768473
100	Nero D'Avola	Nero D'Avola Rotwein (0,2l)	7.5	Rotwein	t	Nero D'Avola	Nero D'Avola	Nero D'Avola Rotwein (0,2l)	Nero D'Avola red wine (0.2l)	Rotwein	Red Wine	L	\N	2025-09-29 16:25:19.790645	2025-09-29 16:25:19.790645
101	Pinot Grigio	Pinot Grigio Weißwein (0,2l)	7.5	Weißwein	t	Pinot Grigio	Pinot Grigio	Pinot Grigio Weißwein (0,2l)	Pinot Grigio white wine (0.2l)	Weißwein	White Wine	L	\N	2025-09-29 16:25:19.815976	2025-09-29 16:25:19.815976
102	Chardonnay	Chardonnay Weißwein (0,2l)	7.5	Weißwein	t	Chardonnay	Chardonnay	Chardonnay Weißwein (0,2l)	Chardonnay white wine (0.2l)	Weißwein	White Wine	L	\N	2025-09-29 16:25:19.838229	2025-09-29 16:25:19.838229
103	Malteserkreuz Aquavit	Malteserkreuz Aquavit (2cl)	5.5	Spirituosen	t	Malteserkreuz Aquavit	Malteserkreuz Aquavit	Malteserkreuz Aquavit (2cl)	Malteserkreuz Aquavit (2cl)	Spirituosen	Spirits		\N	2025-09-29 16:25:19.860965	2025-09-29 16:25:19.860965
104	Vodka 23	Vodka 23 (2cl)	6.5	Spirituosen	t	Vodka 23	Vodka 23	Vodka 23 (2cl)	Vodka 23 (2cl)	Spirituosen	Spirits		\N	2025-09-29 16:25:19.881924	2025-09-29 16:25:19.881924
105	Williamsbirne	Williamsbirne (2cl)	7.5	Spirituosen	t	Williamsbirne	Williams Pear Brandy	Williamsbirne (2cl)	Williams pear brandy (2cl)	Spirituosen	Spirits		\N	2025-09-29 16:25:19.903941	2025-09-29 16:25:19.903941
106	Calvados X.O.	Calvados X.O. (2cl)	7.5	Spirituosen	t	Calvados X.O.	Calvados X.O.	Calvados X.O. (2cl)	Calvados X.O. (2cl)	Spirituosen	Spirits		\N	2025-09-29 16:25:19.932609	2025-09-29 16:25:19.932609
107	Grappa Hausmarke	Grappa Hausmarke (2cl)	5.5	Spirituosen	t	Grappa Hausmarke	House Grappa	Grappa Hausmarke (2cl)	House grappa (2cl)	Spirituosen	Spirits		\N	2025-09-29 16:25:19.954003	2025-09-29 16:25:19.954003
108	Grappa Scavi & Ray	Grappa Scavi & Ray (2cl)	13.5	Spirituosen	t	Grappa Scavi & Ray	Grappa Scavi & Ray	Grappa Scavi & Ray (2cl)	Grappa Scavi & Ray (2cl)	Spirituosen	Spirits		\N	2025-09-29 16:25:19.975103	2025-09-29 16:25:19.975103
109	Baileys	Baileys (2cl)	7.5	Spirituosen	t	Baileys	Baileys	Baileys (2cl)	Baileys (2cl)	Spirituosen	Spirits	G	\N	2025-09-29 16:25:19.997312	2025-09-29 16:25:19.997312
110	Averna	Averna (2cl)	5.5	Liköre	t	Averna	Averna	Averna (2cl)	Averna (2cl)	Liköre	Liqueurs		\N	2025-09-29 16:25:20.019265	2025-09-29 16:25:20.019265
111	Limoncello	Limoncello (2cl)	5.5	Liköre	t	Limoncello	Limoncello	Limoncello (2cl)	Limoncello (2cl)	Liköre	Liqueurs		\N	2025-09-29 16:25:20.03986	2025-09-29 16:25:20.03986
112	Ramazotti	Ramazotti (2cl)	5.5	Liköre	t	Ramazotti	Ramazotti	Ramazotti (2cl)	Ramazotti (2cl)	Liköre	Liqueurs		\N	2025-09-29 16:25:20.061738	2025-09-29 16:25:20.061738
113	Sambuca	Sambuca (2cl)	6.5	Liköre	t	Sambuca	Sambuca	Sambuca (2cl)	Sambuca (2cl)	Liköre	Liqueurs		\N	2025-09-29 16:25:20.08376	2025-09-29 16:25:20.08376
114	Amaretto	Amaretto (2cl)	4.5	Liköre	t	Amaretto	Amaretto	Amaretto (2cl)	Amaretto (2cl)	Liköre	Liqueurs		\N	2025-09-29 16:25:20.105107	2025-09-29 16:25:20.105107
115	Sanbitter alkoholfrei	Sanbitter alkoholfrei (2cl)	4	Liköre	t	Sanbitter alkoholfrei	Sanbitter Non-Alcoholic	Sanbitter alkoholfrei (2cl)	Sanbitter non-alcoholic (2cl)	Liköre	Liqueurs		\N	2025-09-29 16:25:20.130268	2025-09-29 16:25:20.130268
116	Dalwhinnie Scotch Single Malt 15 Jahre	Dalwhinnie Scotch Single Malt 15 Jahre alt (2cl)	11.5	Whisky	t	Dalwhinnie Scotch Single Malt 15 Jahre	Dalwhinnie Scotch Single Malt 15 Years	Dalwhinnie Scotch Single Malt 15 Jahre alt (2cl)	Dalwhinnie Scotch Single Malt 15 years old (2cl)	Whisky	Whisky		\N	2025-09-29 16:25:20.152929	2025-09-29 16:25:20.152929
117	Chivas	Chivas (2cl)	12.5	Whisky	t	Chivas	Chivas	Chivas (2cl)	Chivas (2cl)	Whisky	Whisky		\N	2025-09-29 16:25:20.173939	2025-09-29 16:25:20.173939
118	Glenfiddich	Glenfiddich (2cl)	12.5	Whisky	t	Glenfiddich	Glenfiddich	Glenfiddich (2cl)	Glenfiddich (2cl)	Whisky	Whisky		\N	2025-09-29 16:25:20.195859	2025-09-29 16:25:20.195859
119	Vodka 23 - Goldberg Bitter Lemon	Vodka 23 - Goldberg Bitter Lemon (2cl)	8.5	Longdrinks	t	Vodka 23 - Goldberg Bitter Lemon	Vodka 23 - Goldberg Bitter Lemon	Vodka 23 - Goldberg Bitter Lemon (2cl)	Vodka 23 - Goldberg Bitter Lemon (2cl)	Longdrinks	Longdrinks		\N	2025-09-29 16:25:20.21774	2025-09-29 16:25:20.21774
120	Whisky Cola	Whisky Cola (2cl)	10.5	Longdrinks	t	Whisky Cola	Whisky Cola	Whisky Cola (2cl)	Whisky Cola (2cl)	Longdrinks	Longdrinks		\N	2025-09-29 16:25:20.240939	2025-09-29 16:25:20.240939
121	Gin Tonic - Hendrick's Gin	Gin Tonic - Hendrick's Gin (2cl)	12.5	Longdrinks	t	Gin Tonic - Hendrick's Gin	Gin Tonic - Hendrick's Gin	Gin Tonic - Hendrick's Gin (2cl)	Gin Tonic - Hendrick's Gin (2cl)	Longdrinks	Longdrinks		\N	2025-09-29 16:25:20.263597	2025-09-29 16:25:20.263597
122	Cuba Libre	Cuba Libre (2cl)	9.5	Longdrinks	t	Cuba Libre	Cuba Libre	Cuba Libre (2cl)	Cuba Libre (2cl)	Longdrinks	Longdrinks		\N	2025-09-29 16:25:20.285851	2025-09-29 16:25:20.285851
123	Aperol Spritz	Klassischer italienischer Aperitif	8.5	Longdrinks	t	Aperol Spritz	Aperol Spritz	Klassischer italienischer Aperitif	Classic Italian aperitif	Longdrinks	Longdrinks		\N	2025-09-29 16:25:20.307815	2025-09-29 16:25:20.307815
\.


--
-- Data for Name: reservations; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.reservations (id, name, phone, email, date, "time", guests, status, notes, created_at, updated_at) FROM stdin;
1	Test	123-456-7890	test@test.com	2024-01-15	19:00	2	pending		2025-09-29 16:01:08.82827	2025-09-29 16:01:08.82827
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.sessions (sid, sess, expire) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.users (id, email, first_name, last_name, profile_image_url, created_at, updated_at) FROM stdin;
\.


--
-- Name: admin_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.admin_users_id_seq', 1, false);


--
-- Name: contact_messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.contact_messages_id_seq', 3, true);


--
-- Name: event_bookings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.event_bookings_id_seq', 1, false);


--
-- Name: events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.events_id_seq', 1, false);


--
-- Name: feedbacks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.feedbacks_id_seq', 1, false);


--
-- Name: gallery_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.gallery_id_seq', 2, true);


--
-- Name: menu_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.menu_items_id_seq', 123, true);


--
-- Name: reservations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.reservations_id_seq', 1, true);


--
-- Name: admin_users admin_users_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.admin_users
    ADD CONSTRAINT admin_users_pkey PRIMARY KEY (id);


--
-- Name: contact_messages contact_messages_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.contact_messages
    ADD CONSTRAINT contact_messages_pkey PRIMARY KEY (id);


--
-- Name: event_bookings event_bookings_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.event_bookings
    ADD CONSTRAINT event_bookings_pkey PRIMARY KEY (id);


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- Name: feedbacks feedbacks_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.feedbacks
    ADD CONSTRAINT feedbacks_pkey PRIMARY KEY (id);


--
-- Name: gallery gallery_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.gallery
    ADD CONSTRAINT gallery_pkey PRIMARY KEY (id);


--
-- Name: menu_items menu_items_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.menu_items
    ADD CONSTRAINT menu_items_pkey PRIMARY KEY (id);


--
-- Name: reservations reservations_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT reservations_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (sid);


--
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: IDX_session_expire; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX "IDX_session_expire" ON public.sessions USING btree (expire);


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


--
-- PostgreSQL database dump complete
--

