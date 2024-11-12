const fs = require("fs/promises");
const puppeteer = require("puppeteer");
const xlsx = require("xlsx");
const { existsSync } = require("fs");

const API_KEY = "9601ea90b803e661ae1ac47da8766edb";
const URL = "https://www.google.com/search?sca_esv=439ed1f28d78315f&sxsrf=ADLYWIJahYgZfHEvkG40dsdPFmMFZMuSxQ:1730347689561&q=acoso&tbm=nws&source=lnms&fbs=AEQNm0CbCVgAZ5mWEJDg6aoPVcBgWizR0-0aFOH11Sb5tlNhdzvguW7TJ8ZJj4v-NOGupFjybypXATN8-ElM0wR8g3shT0H2getaBJGy1Fy_gJM3BOq0g-_4p_I27ERf2G5MCUxTiZHKKFIrCWpydjBr00cSGQnIeNCg7Bnp5cfQY7elO3YREZ2uJfbm4k0SrvNKANbHgMa3jwOxrSqHH73jkAnNR_VqOg&sa=X&ved=2ahUKEwjF8f6637eJAxXa78kDHaFEKxYQ0pQJegQIExAB&biw=1920&bih=955&dpr=1";

const fecha = new Date();

const dia = String(fecha.getDate()).padStart(2, '0');
const mes = String(fecha.getMonth() + 1).padStart(2, '0');
const anio = String(fecha.getFullYear()).slice(-2);

const formato = `${dia}${mes}${anio}`;

async function main() {
  const response = await fetch(
    `http://api.scraperapi.com?api_key=${API_KEY}&url=${URL}&render=true`
  );

  const data = await response.text();
  //await fs.writeFile(`html/output_${formato}.html`, data);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(data);
  const noticiasData = await page.evaluate(() => {
    const noticia_completa = document.querySelectorAll("div.SoAPf");

    console.log(noticia_completa);

    const noticiasData = [];

    noticia_completa.forEach((noticiaElement) => {
      const titulo_noticia = noticiaElement.querySelector(
        "div.n0jPhd.ynAwRc.MBeuO.nDgy9d"
      );
      const noticiero_txt = noticiaElement.querySelector("div.MgUUmf.NUnG9d");
      const descripcionNoti = noticiaElement.querySelector("div.GI74Re.nDgy9d");

      console.log(
        titulo_noticia.textContent,
        noticiero_txt.textContent,
        descripcionNoti.textContent
      );

      noticiasData.push({
        titulo: titulo_noticia.textContent,
        noticiero: noticiero_txt.textContent,
        descripcion: descripcionNoti.textContent,
      });
    });

    return noticiasData;
  });

  console.log(noticiasData);

  const filePath_csv = `../src/csv/noticias_${formato}.csv`;
  const filePath_xlsx = `../src/xlsx/noticias_${formato}.xlsx`;

  if (existsSync(filePath_csv)) {
    console.log("El archivo csv existe");
  } else {
    let csv = "Titulo, Noticiero, Descripcion \n";

    noticiasData.forEach((noticia) => {
      csv += `${noticia.titulo}, ${noticia.noticiero}, ${noticia.descripcion} \n`;
    });

    await fs.writeFile(`../csv/noticias_${formato}.csv`, csv);
    console.log('Archivo csv creado')
  }

  if (existsSync(filePath_xlsx)) {
    console.log("El archivo xlsx existe");
  } else {
    const ws = xlsx.utils.json_to_sheet(noticiasData)
    const wb = xlsx.utils.book_new()
    xlsx.utils.book_append_sheet(wb, ws, 'Noticias')

    await fs.writeFile(`../xlsx/noticias_${formato}.xlsx`, xlsx.write(wb, {type: 'buffer', bookType: 'xlsx'}))

    console.log('Archivo xlsx creado')
  }

  await browser.close();
}

main();