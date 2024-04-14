const UserProfile = ({ params }: { params: { slug: string } }) => {
  return <div>page {params.slug}</div>;
};

export default UserProfile;
