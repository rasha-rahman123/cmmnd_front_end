This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install the packages:

```bash
npm i
```
Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file. (that is where splash page is located)

Shopify Store Front API code to be put in Context/ShopContext.js

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.



https://medium.com/@sirenapparel/adding-shopifys-storefront-api-to-an-existing-react-app-with-react-redux-ea442bd7543


## How to Change Letter Colors

1. Go to components -> Scene.js
2. Press ctrl + f (windows) or cmmnd + f (mac) to open up the search bar and search for: ---
3. You should be taken to something that looks like `const Scene = () =>` and underneath it should indicate two sections for changing colors.
4. For the first section labeled as "CHANGE CMMND COLORS HERE," it contains the Letter component (`<Letter url="c"...`) responsible for spawning the CMMND logo when you first open the page. The two most important properties to note here are url and color. url determines which letter is being spawned and color changes the color of the letters. You can go in and mess with the hex code and the letters in the CMMND logo will change colors. Please keep the hex code between quotation marks or else the program will break.
5. For the second section labeled as "CHANGE RANDOMIZED COLORS HERE," the hex codes between the square brackets determine the randomized colors that get applied to the letter "rain." The fewest number of colors you can have is 1 and the most is as many as you want, although in the interest of good design I'd recommend no more than 6. In addition to keeping the hex code between quotation marks, please also separate each hex code by a comma outside of the quotation mark.
