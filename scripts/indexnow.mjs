// Tells Bing and other IndexNow engines which pages changed. Run after a deploy: npm run indexnow
const host = "bytwofolds.co.in", key = "b5c1ce8b03961f7c27919cf4df1ebe03"; // public by design, matches public/b5c1ce8b03961f7c27919cf4df1ebe03.txt
const xml = await (await fetch(`https://${host}/sitemap.xml`)).text();
const urlList = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation: `https://${host}/${key}.txt`, urlList }),
});
console.log(`${urlList.length} URLs sent, response ${res.status}`, await res.text());
