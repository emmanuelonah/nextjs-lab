import React from 'react';

type MapStateToProps<S = Record<string, any>> = (_s: S) => any;

type MapDispatchToProps<S = Record<string, any>> = { [key: string]: (_s: S) => any };

/**
 * @dummyConnect function is a higher-order function that takes in two mapping functions and returns a
 * function that augments a React component by passing in the mapped state and dispatch props.
 * @param {MapStateToProps} _mapStateToProps - A function that maps the state from the Redux store to
 * the props of the component. It takes the state as an argument and returns an object that represents
 * the props.
 * @param {MapDispatchToProps} mapDispatchToProps - The mapDispatchToProps parameter is a function that
 * maps dispatch actions to props. It takes the dispatch function as an argument and returns an object
 * where each property is a function that dispatches an action. This allows the component to access and
 * dispatch actions to the Redux store.
 * @returns The function `dummyConnect` is returning a higher-order function.
 */
export function dummyConnect<P = {}, S = {}>(mapStateToProps: MapStateToProps, mapDispatchToProps: MapDispatchToProps) {
  return function augmentComponent(Component: React.FunctionComponent<P> | React.ComponentClass<P, S>) {
    return function AugmentedComponent(props: any) {
      const [state, _setState] = React.useState({
        name: 'Emmanuel Onah',
        profession: 'Software engineer',
        nationality: 'Nigerian',
      });
      return <Component {...props} {...mapDispatchToProps} {...mapStateToProps(state)} {...state} />;
    };
  };
}
