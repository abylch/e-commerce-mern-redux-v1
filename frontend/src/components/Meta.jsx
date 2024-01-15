import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'abylch',
  description: '@e-Shop-Shop; Redux MERN Stack skeleton, e-commerce plataform template a work in progress, always evolving.',
  keywords: 'abylch, e-commerce, website, abraham bylch, bylch',
};

export default Meta;