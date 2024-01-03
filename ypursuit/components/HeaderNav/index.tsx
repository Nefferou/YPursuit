import classes from './index.module.css';

function HeaderNav() {
  return (
    <div className={classes.headerNav}>
      <button>Jouer</button>
      <button>Projet</button>
      <button>L'Équipe</button>
      <button>Nos Personnages</button>
      <button>Goodies</button>
      <button>Nous contacter</button>
    </div>
  );
};

export default HeaderNav;
