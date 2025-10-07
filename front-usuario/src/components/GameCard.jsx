export default function GameCard({ game }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem" }}>
      <img src={game.imageUrl} alt={game.title} width="150" />
      <h4>{game.title}</h4>
      <p>${game.price}</p>
      <p>Plataforma: {game.platform}</p>
    </div>
  );
}
