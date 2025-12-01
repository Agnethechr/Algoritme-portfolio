"use strict";

import { Queue } from "../queue/queue.js";
import { Stack } from "../stack/stack.js";


export function infixToPostfix(expression) {
  if (typeof expression !== "string") {
    throw new TypeError("Expression must be a string with tokens separated by spaces.");
  }


  const operators = {
    "^": { prec: 4, assoc: "right" },
    "*": { prec: 3, assoc: "left" },
    "/": { prec: 3, assoc: "left" },
    "+": { prec: 2, assoc: "left" },
    "-": { prec: 2, assoc: "left" }
  };

  function isOperator(token) {
    return token in operators;
  }

  function isLeftParen(token) {
    return token === "(";
  }

  function isRightParen(token) {
    return token === ")";
  }

  const inputQ = new Queue();
  const outputQ = new Queue();
  const opStack = new Stack();

  const rawTokens = expression.trim().split(/\s+/);
 
  for (let t of rawTokens) inputQ.enqueue(t);

 
  while (inputQ.size() > 0) {
    const token = inputQ.dequeue();

    if (!isOperator(token) && !isLeftParen(token) && !isRightParen(token)) {
     
      outputQ.enqueue(token);
      continue;
    }

    if (isOperator(token)) {
      while (opStack.peek() !== null) {
        const top = opStack.peek(); 
        if (!isOperator(top)) break;

        const o1 = token;
        const o2 = top;

        const p1 = operators[o1].prec;
        const p2 = operators[o2].prec;
        const assoc1 = operators[o1].assoc;

        if (
          (assoc1 === "left" && p1 <= p2) ||
          (assoc1 === "right" && p1 < p2)
        ) {
         
          const popped = opStack.pop(); 
          outputQ.enqueue(popped);
        } else {
          break;
        }
      }
    
      opStack.push(token);
      continue;
    }

    if (isLeftParen(token)) {
      opStack.push(token);
      continue;
    }

  
    if (isRightParen(token)) {
      let foundLeft = false;
      while (opStack.peek() !== null) {
        const top = opStack.peek();
        if (isLeftParen(top)) {
          foundLeft = true;
          opStack.pop(); 
          break;
        } else {
          outputQ.enqueue(opStack.pop());
        }
      }
      if (!foundLeft) {
        throw new Error("Mismatched parentheses: no matching '(' found for ')'");
      }
      continue;
    }
  }

  while (opStack.peek() !== null) {
    const top = opStack.pop();
    if (isLeftParen(top) || isRightParen(top)) {
      throw new Error("Mismatched parentheses detected.");
    }
    outputQ.enqueue(top);
  }

  const n = outputQ.size();
  let tokens = [];
  for (let i = 0; i < n; i++) {
    tokens.push(outputQ.get(i));
  }

  return tokens.join(" ");
}
