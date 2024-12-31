/*
simulate api mock data and return a promise
-----------------------
we need to enhance user experienceby implemening debounce: delay the excution of the function
:Instead of passing the query directly to the function, we can pass a debounced version of it
which is basically a peice of state that is updated after a certain amount of time has passed
-----------------------
issues:
what is one promise resolve before another promise resolve
so we use abort controller to cancel the previous promise

- we can implement throttling to limit the number of requests 

-----------------------
what if we search the same thing multiple times
it should be instant to see something we already searched about 

- we can implement caching if we send the same request multiple times we should get the same result from the cache

- what if there is no result for the query
- handle the loading state  to show to the user
- error state to show to the user
- how to make production ready : write test on diffrent browser and inputs : make sure inputs are sanitized
- ensure a11y for screen readers and keyboard users 
- document the props
- generalize 


-----------------------

*/
export async function getAutoCompleteFruits(
  query: string,
  signal?: AbortSignal
): Promise<string[]> {
  const fruits = [
    "Apple",
    "Banana",
    "Orange",
    "Grape",
    "Mango",
    "Pineapple",
    "Strawberry",
    "Blueberry",
    "Raspberry",
    "Peach",
    "Cherry",
    "Kiwi",
    "Watermelon",
    "Cantaloupe",
    "Honeydew",
    "Papaya",
    "Dragonfruit",
    "Lychee",
    "Pomegranate",
    "Guava",
    "Plum",
    "Apricot",
    "Fig",
    "Blackberry",
    "Coconut",
    "Lemon",
    "Lime",
    "Tangerine",
    "Passionfruit",
    "Pear",
  ];

  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(signal.reason);
    }

    setTimeout(
      () =>
        resolve(
          fruits.filter((fruit) =>
            fruit.toLowerCase().includes(query.toLowerCase())
          )
        ),
      1000 * Math.random()
    );
  });
}
