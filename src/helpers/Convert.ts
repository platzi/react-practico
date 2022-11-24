export const replaceAll = ( text: string, busca: string, reemplaza: string ) => {
    while (text.toString().indexOf(busca) != -1)
        text = text.toString().replace(busca,reemplaza);
    return text;
  };