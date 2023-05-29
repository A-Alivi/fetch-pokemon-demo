export async function fetchPokemon(name) {
    try {
      const res = await fetch('https://graphqlpokemon.favware.tech/v7', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
        {
          getPokemon(pokemon: ${name}) {
              sprite
              num
              species
              color
          }
        }
      `,
        }),
      });
      const json = await res.json();
      console.log('JSON: ', json);
      return {
        data: json?.data?.getPokemon,
        error: json?.errors ? json.errors[0].message : undefined,
      };
    } catch (err) {
      console.log('Error: ', err);
      return { error: err.message };
    }
  }
  