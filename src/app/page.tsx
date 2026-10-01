const aaujaars = [
  {
    name: "Base64 Encoder/Decoder",
    route: "/base64",
  },
  {
    name: "Romanized Nepali Typing",
    route: "/type-in-nepali",
  },
];

export default function Home() {
  return (
    <main>
      <h1>Aaujaar - digital arsenal</h1>

      <div>
        {aaujaars.map((aaujaar) => {
          return <a href={aaujaar.route}>{aaujaar.name}</a>;
        })}
      </div>
    </main>
  );
}
