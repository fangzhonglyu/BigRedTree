const url = "https://tree.atcg.dev/api/";

export function postNewUser(username: string, sub: string, college: string) {
  try {
    return fetch(url + 'users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: username,
        sub: sub,
        college: college
      })
    })
      .then(response => response.json())
  } catch (error) {
    console.error('Error:', error);
  }
}

// async () => {
//   try {
//     const response = await fetch(
//       'https://reactnative.dev/movies.json'
//     );
//     const json = await response.json();
//     return json.movies;
//   } catch (error) {
//     console.error(error);
//   }
// };

export function getUser(sub: string) {
  try {
    return fetch(url + 'users/' + sub + "/")
      .then(response => response.json())
  }
  catch (error) {
    console.error('Error:', error);
  }
}

export function getUsers() {
  try {
    return fetch(url + 'users/')
      .then(response => response.json())
  }
  catch (error) {
    console.error('Error:', error);
  }
}

export function updateTree(sub: string, tree: number) {
  return fetch(url + 'users/tree/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      amount: tree,
      sub: sub
    })
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}