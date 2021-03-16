// importamos la funcion que vamos a testear
import { router } from '../src/main.js';



describe('router', () => {
  console.log('hola');
  it('debería ser una función', () => {
    expect(typeof router).toBe('function');
  });
});

// describe('Test welcome', () => {
  // //  Crea html en el test
  // beforeEach(() => {
  //   document.body.innerHTML = '<div id="root"></div>';
  // });
  // test('debería renderizar', () => {
  //   const target = document.getElementById('root');
  //   const mockedReplace = jest.fn();
  //   const originalWindow = { ...window };
  //   const windowSpy = jest.spyOn(global, "window", "get");
  //   windowSpy.mockImplementation(() => ({
  //     ...originalWindow,
  //     location: {
  //     ...originalWindow.location,
  //     href: "http:http://localhost:5000",
  //     replace: mockedReplace,
  //   },
  // }));
  //   router();
  //   expect(target.innerHTML).toMatchSnapshot();
  // });
// });