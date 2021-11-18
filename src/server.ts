import express from "express";
import { read } from "fs";
import { join } from "path";

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Try a more interesting route...",
  });
});

app.get("/eat/apple", (req, res) => {
  res.json({
    message: "Yum yum - you ate an apple!",
  });
});

app.get("/eat/banana", (req, res) => {
  res.json({
    message: "Yum yum - you ate a banana!",
  });
});

app.get("/eat/carrot", (req, res) => {
  res.json({
    message: "Yum yum - you ate a carrot!",
  });
});

app.get<{exampleRouteParameter: string}>("/echo/:exampleRouteParameter", (req, res) => {
  const echoContent = req.params.exampleRouteParameter;
  // const echoContent = req.params.exampleRouteParametre; // oops, typo

  res.json({
    echo: echoContent,
    message: `I am echoing back to you: ${echoContent}`,
  });
});

// app.get<{numOne: string; numTwo: string}>("/add/:numOne/:numTwo", (req, res) => {
//   const {numOne, numTwo} = req.params;
//   const addition = parseInt(numOne) + parseInt(numTwo);
//   res.json({
//     original: `${numOne} + ${numTwo}`,
//     result: addition
//   })
// })

// app.get("/add/*", (req, res) => {
//   let numbers = req.params[0].split("/");

//   let sum = 0;
//   for (let num of numbers) {
//     sum += parseInt(num);
//   }
//   res.json({
//     original: numbers.join(" + "),
//     result: sum
//   })
// })

app.get<{numOne:string; numTwo:string; numThree?:string}>("/add/:numOne/:numTwo/:numThree?", (req, res) => {
  let numbers;
  if (req.params.numThree) {
    numbers = [req.params.numOne, req.params.numTwo, req.params.numThree]
  } else {
    numbers = [req.params.numOne, req.params.numTwo]
  }

  let sum = 0;
  for (let num of numbers) {
    sum += parseInt(num);
  }
  res.json({
    original: numbers.join(" + "),
    result: sum
  })
})

app.get<{numOne:number; numTwo:number}>("/multiply/:numOne/:numTwo", (req, res) => {
  /**
   * Note that `numOne` and `numTwo` are both typed as string.
   * (Hover over with your mouse to see!)
   *
   * Route params are, by default, typed as strings when they
   * are parsed by Express.
   */
  const { numOne, numTwo } = req.params;
  // const multiplication = parseInt(numOne) * parseInt(numTwo);
  const multiplication = numOne * numTwo;
  res.json({
    original: `${numOne} x ${numTwo}`,
    result: multiplication,
  });
});

/**
 * `app.get` can take a type argument.
 *
 *  This could be the name of an existing type (e.g. an interface)
 *    or a literal object type that is provided directly, as below.
 */
app.get<{ name: string }>("/happy-birthday/:name", (req, res) => {
  res.json({
    lyrics: [
      "Happy birthday to you",
      "Happy birthday to you",
      /**
       * The type argument stops us from, e.g., the silly typo
       * of `req.params.namw` - try it, and see!
       */
      `Happy birthday dear ${req.params.name}`,
      "Happy birthday to you!",
    ],
  });
});

app.get<{ strToShout: string }>("/shout/:strToShout", (req, res) => {
  const shoutResult = req.params.strToShout.toUpperCase();
  res.json({
    shout: shoutResult,
    result: `I am shouting back to you: ${shoutResult}`
  });
});

app.get<{food:string}>("/eat/:food", (req, res) => {
  let food = req.params.food;
  let outputStr = ["a","e","i","o","u"].includes(food[0].toLowerCase()) ? `Yum yum - you ate an ${food}`:`Yum yum - you ate a ${food}`;
  res.json({
    message: outputStr
  })
})

// using 4000 by convention, but could be changed
const PORT_NUMBER = 4000;

app.listen(PORT_NUMBER, () => {
  console.log(`Server is listening on ${PORT_NUMBER}`);
});
