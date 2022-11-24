import { FC, lazy, LazyExoticComponent } from 'react';

interface ActionEvent<T, P> {
  type: T;
  payload?: P;
}

const actionEvent = <T, P>({ type, payload }: ActionEvent<T, P>): ActionEvent<T, P> => ({
  type,
  payload,
});

const lazyComponent = (
  name: string,
  importer: Promise<Record<string, FC>>
): LazyExoticComponent<FC> =>
  lazy(async () => {
    const component = await importer;
    return { default: component[name] };
  });

const encrypt = (text: string): string => window.btoa(unescape(encodeURIComponent(text)));

const decrypt = (text: string): string => decodeURIComponent(escape(window.atob(text)));

const copyText = (text: string): void => {
  const aux: HTMLInputElement = document.createElement('input');
  aux.setAttribute('value', text);
  document.body.appendChild(aux);
  aux.select();
  document.execCommand('copy');
  document.body.removeChild(aux);
};

const isTest: boolean = process.env.NODE_ENV === 'test';
const isProd: boolean = process.env.NODE_ENV === 'production';

export { actionEvent, lazyComponent, encrypt, decrypt, isTest, isProd, copyText };
