export default function QuizProgress ({ totalQn = 0, currentQn = 0 }) {
  const getProgress = () => {
    if (totalQn === 0) return "0%";
    return (currentQn / totalQn * 100) + "%";
  }

  return (
    <div
      style={{
        width: '100%',
        height: 2,
        backgroundColor: '#ccc',
        position: 'relative',
        borderRadius: '50%',
      }}
    >
      <div 
        style={{
          width: getProgress(),
          height: 6,
          position: 'absolute',
          bottom: 0,
          left: 0,
          backgroundColor: '#5955e5',
          borderRadius: 14
        }} 
      />
    </div>
  )
}