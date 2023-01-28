import Portfolio from "../Portfolio/Portfolio";

function AboutMe() {
  return (
    <section id="about-me" className="about-me">
      <h2 className="titles__title_22-27-reg-underlined">Студент</h2>
      <div className="about-me__info">
        <div className="about-me__about">
          <h3 className="titles__title_50-58-reg about-me__title">Мария</h3>
          <h4 className="about-me__text_prof">Студентка, 36 лет</h4>
          <p className="about-me__text_about">
            Я родилась и живу в Санкт-Петербурге. У меня есть муж и две замечательные дочки. Я люблю петь, танцевать, кататься на лошадях и проводить время с семьёй и друзьями!
            Я закончила Университет Кино и Телевидения, работала проектировщицей электрических сетей. 
            Давно хотела начать изучать JS, а в прошлом году решилась-таки реализовать свои планы. С этой целью выбрала курс Веб-разработчика от Яндекс Практикума, после окончания которого надеюсь найти работу в новой сфере. 
          </p>
          <p className="about-me__text_github">Github</p>
        </div>
        <div className="about-me__avatar"></div>
      </div>
      <Portfolio />
    </section>
  );
}

export default AboutMe;
