/* ===== Edit everything about the business here ===== */
export const site = {
  name: "Blissful love events",
  email: "studentxapp@gmail.com",      // shown on the site AND where form submissions are delivered
  phone: "+1 519 000 0000",            // placeholder: replace
  city: "London, Ontario, Canada",
};

// PHOTOS: put image files in /public/images and set the path, e.g. "/images/hero.jpg".
// While a value is null, a branded animated illustration is shown instead.
export const photos = { hero: null, about: null, wide: null };

export const nav = [
  ["Services", "/#services"],
  ["Process", "/#process"],
  ["Our work", "/work"],
  ["Voices", "/#voices"],
  ["Contact", "/contact"],
];

export const headline = "Celebrations with the warmth of home.".split(" ");
export const ticker = ["Weddings", "Traditional ceremonies", "Birthdays", "Graduations", "Conferences", "Naming ceremonies"];

export const services = [
  ["Weddings & traditional ceremonies", "Engagements, traditional weddings and white weddings, planned around both families’ customs."],
  ["Birthday parties", "Milestone birthdays and children’s parties with the music, food and energy your guests expect."],
  ["Graduation celebrations", "From campus-day gatherings to evening receptions for graduates and proud families."],
  ["Conferences & community events", "Business summits, association and church events, and newcomer networking days."],
  ["Naming ceremonies & anniversaries", "Intimate gatherings with the protocol, hospitality and photography they deserve."],
  ["Décor, catering & entertainment", "Nigerian and Canadian menus, MCs, DJs, live bands and styling, sourced and managed for you."],
];

export const steps = [
  ["Conversation", "We learn who is coming, what matters to each family and what the day should feel like."],
  ["Plan", "Venue, budget, programme and timeline are agreed before anything is booked."],
  ["Produce", "Vendors, décor, menus and entertainment come together and get rehearsed."],
  ["Celebrate", "One team on the ground so you can enjoy your own celebration."],
  ["Wrap up", "Vendor close-out, returns, and photos and videos delivered."],
];

// SAMPLE FIGURES: replace with your real numbers before launch.
export const stats = [
  [6, "+", "Years planning"],
  [120, "+", "Celebrations"],
  [300, "", "Largest guest list"],
  [100, "%", "Handled start to finish"],
];

// SAMPLE TESTIMONIALS: replace with real client quotes.
export const voices = [
  ["We were nervous about mixing our friends and her church family. Within an hour you couldn’t tell who came from where.", "Daughter of the celebrant", "Birthday client"],
  ["Both sets of parents felt seen. The traditional ceremony and the white wedding each had their moment.", "Groom", "Wedding client"],
  ["They took the chasing off our plate and still kept us informed at every step.", "Programme lead", "Community summit client"],
];

/* ===== Our work =====
   SAMPLE PROJECTS: written as examples. Replace with your real events, details and photos.
   Set `photo` and `gallery` to image paths (e.g. "/images/work/wedding-1.jpg") when you have them. */
export const categories = ["All", "Birthday", "Wedding", "Conference", "Graduation"];

export const projects = [
  {
    slug: "mama-ngozis-60th-birthday-owambe", title: "Mama Ngozi’s 60th Birthday Owambe", cat: "Birthday", kind: "birthday",
    place: "London, Ontario", guests: 150, venue: "Banquet hall", duration: "One evening", planning: "10 weeks",
    summary: "A joyful 60th for a mother of five, with family flying in from Lagos and neighbours from across London joining the dance floor.",
    brief: "Her children wanted a party that felt like the ones back home, while Canadian friends and colleagues needed to feel included. They asked for great food, a confident MC and no one standing around wondering what comes next.",
    did: ["Sourced a banquet hall with a proper dance floor", "Built a menu pairing jollof, suya and small chops with a Canadian dessert table", "Booked and briefed the MC and DJ, and ran a short programme of tributes", "Shared aso-ebi colour guidance and managed seating", "Designed the décor and photo backdrop", "Ran the room from first arrival to last song"],
    touches: [["Two menus, one table", "Clear labels so guests new to Nigerian food knew what to try first."], ["Tributes from two time zones", "A video from relatives in Lagos played during the cake cutting."], ["A dance floor that works", "Music sequenced so every generation got its turn."]],
    quote: ["We were nervous about mixing our friends and her church family. Within an hour you couldn’t tell who came from where.", "Daughter of the celebrant"],
    photo: null, gallery: [null, null, null],
  },
  {
    slug: "tunde-and-emily-wedding-weekend", title: "Tunde & Emily’s Wedding Weekend", cat: "Wedding", kind: "wedding",
    place: "London, Ontario", guests: 180, venue: "Heritage venue", duration: "Two days", planning: "9 months",
    summary: "A traditional engagement on Saturday and a white wedding on Sunday, bringing a Nigerian family and a Canadian family into one celebration.",
    brief: "Two families, two sets of customs and one couple who wanted neither to feel like a guest. The weekend needed to be clear for first-timers and faithful for elders.",
    did: ["Mapped the traditional ceremony order with both families’ elders", "Coordinated outfit changes, bridal party and family entrances", "Designed matching décor for both days", "Printed bilingual programme cards explaining each moment", "Managed vendors, rentals and guest transport across both days", "Kept a calm, quiet backstage schedule"],
    touches: [["Programme notes for everyone", "Short, friendly explanations of each ritual for guests seeing it for the first time."], ["Two menus, two moods", "Traditional dishes Saturday, a plated Canadian dinner Sunday."], ["Elders at the centre", "Seating and introductions planned so family heads were honoured."]],
    quote: ["Both sets of parents felt seen. Each ceremony had its moment.", "Groom"],
    photo: null, gallery: [null, null, null],
  },
  {
    slug: "newcomers-business-summit", title: "Newcomers Business Summit", cat: "Conference", kind: "conference",
    place: "London, Ontario", guests: 220, venue: "Conference hall", duration: "One day", planning: "4 months",
    summary: "A one-day summit for Nigerian and other newcomer entrepreneurs, with panels, networking and local business supporters in the room.",
    brief: "The organisers wanted real introductions, not just speeches. The day needed a clear agenda, smooth registration and space for meaningful conversations.",
    did: ["Booked the hall, AV and staging", "Managed speaker briefings and the run-of-show", "Ran registration and name badges", "Planned catering for varied dietary needs", "Set up sponsor and exhibitor tables", "Coordinated photography and a post-event recap"],
    touches: [["Timed networking blocks", "Structured moments to meet people, not just a lunch break."], ["Food for everyone", "Halal, vegetarian and Nigerian options labelled clearly."], ["A welcoming opening", "MC and programme tone set to include newcomers from many countries."]],
    quote: ["Smooth from registration to the last panel. Our speakers and sponsors were thrilled.", "Summit organiser"],
    photo: null, gallery: [null, null, null],
  },
  {
    slug: "chiomas-graduation-party", title: "Chioma’s Graduation Party", cat: "Graduation", kind: "graduation",
    place: "London, Ontario", guests: 90, venue: "Event loft", duration: "One evening", planning: "6 weeks",
    summary: "A party for a master’s graduate whose classmates, professors and very loud family all had to fit into one warm room.",
    brief: "Chioma’s parents had flown in for convocation and wanted to celebrate properly. Her classmates were mostly Canadian, so the evening had to feel familiar to both groups.",
    did: ["Found and booked an event loft close to campus", "Designed a gold-and-blush décor scheme with a photo wall", "Arranged a mixed menu and dessert table", "Planned speeches, a toast and a surprise slideshow", "Booked a DJ with a Nigerian and Canadian playlist", "Managed RSVPs and guest flow"],
    touches: [["Graduation-cap moment", "A staged photo moment for every guest."], ["Speeches that work in both worlds", "Short, warm and clearly timed."], ["A playlist for everyone", "Afrobeats and current hits, so no one sat out."]],
    quote: ["My parents cried, my classmates danced. Exactly what I hoped for.", "The graduate"],
    photo: null, gallery: [null, null, null],
  },
  {
    slug: "adaora-traditional-engagement", title: "Adaora’s Traditional Engagement", cat: "Wedding", kind: "wedding",
    place: "London, Ontario", guests: 120, venue: "Banquet hall", duration: "One afternoon", planning: "5 months",
    summary: "A traditional engagement ceremony with the families’ elders, wrapped in colour, music and a menu that tasted like home.",
    brief: "The couple wanted a faithful traditional ceremony in Canada, with Canadian friends able to follow along and feel part of it.",
    did: ["Planned the ceremony schedule with the families’ representatives", "Sourced traditional attire accessories and décor items", "Designed stage and seating for the ceremony", "Coordinated catering and drinks service", "Arranged an MC fluent in both languages of the day", "Managed photography and video"],
    touches: [["Guided ceremony", "The MC explained each step so every guest could follow."], ["Colour with meaning", "Palette chosen with both families."], ["Food from home", "Traditional dishes prepared and served on time."]],
    quote: ["It felt like home, and our Canadian friends loved every minute.", "Bride"],
    photo: null, gallery: [null, null, null],
  },
  {
    slug: "zuris-seventh-birthday", title: "Zuri’s 7th Birthday", cat: "Birthday", kind: "birthday",
    place: "London, Ontario", guests: 45, venue: "Community centre", duration: "Three hours", planning: "5 weeks",
    summary: "A bright children’s party with school friends, cousins and parents from many backgrounds, and plenty to do for every age.",
    brief: "Zuri’s parents wanted a party that was fun for kids and relaxed for parents, with food that suited a mixed crowd.",
    did: ["Booked a community centre with a play area", "Designed a balloon and banner theme", "Arranged activities, music and a cake table", "Planned snacks and drinks for children and adults", "Managed invitations and RSVPs", "Handled setup and clean-up"],
    touches: [["Something for every age", "Games for kids and a lounge for parents."], ["Mixed menu", "Jollof, chicken skewers and fruit trays side by side."], ["Easy for hosts", "The family got to be guests at their own party."]],
    quote: ["I actually got to enjoy my daughter’s party.", "Zuri’s mother"],
    photo: null, gallery: [null, null, null],
  },
];

export const eventTypes = ["Wedding", "Traditional / Engagement", "Birthday Party", "Graduation Party", "Naming Ceremony", "Conference / Corporate", "Anniversary", "Other"];
export const needs = ["Full planning", "Day-of coordination", "Décor & design", "Venue sourcing", "Catering & menus", "MC, DJ & entertainment", "Photo & video", "Guest & RSVP management", "Other"];
export const budgets = ["Under $2,500", "$2,500 – $7,500", "$7,500 – $15,000", "$15,000 – $30,000", "Above $30,000", "Not sure yet"];
export const heard = ["Referral", "Instagram", "Facebook", "WhatsApp", "Google search", "Attended an event", "Other"];
