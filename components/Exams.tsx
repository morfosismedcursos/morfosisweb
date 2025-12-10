
import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { ClipboardIcon, LockIcon, CheckCircleIcon, XCircleIcon } from './Icons';
import { User, Parcial, Exam } from '../types';

interface ExamsProps {
  user: User | null;
  onTriggerLogin: () => void;
}

export const Exams: React.FC<ExamsProps> = ({ user, onTriggerLogin }) => {
  const { exams } = useData(); // Usar exams del contexto
  const [selectedParcial, setSelectedParcial] = useState<Parcial>(1);
  const [activeExam, setActiveExam] = useState<Exam | null>(null);
  const [answers, setAnswers] = useState<{[key: string]: number}>({});
  const [showResults, setShowResults] = useState(false);

  const filteredExams = exams.filter(exam => exam.parcial === selectedParcial);
  const partials: Parcial[] = [1, 2, 3];

  const handleStartExam = (exam: Exam) => {
    if (!exam.isFree && !user) {
      onTriggerLogin();
      return;
    }
    setActiveExam(exam);
    setAnswers({});
    setShowResults(false);
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const calculateScore = () => {
    if (!activeExam) return 0;
    let correct = 0;
    activeExam.questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) correct++;
    });
    return Math.round((correct / activeExam.questions.length) * 100);
  };

  const getCorrectCount = () => {
    if (!activeExam) return 0;
    let correct = 0;
    activeExam.questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) correct++;
    });
    return correct;
  };

  const getFeedbackMessage = (score: number) => {
    if (score === 100) return "¡Excelente! Dominas el tema a la perfección.";
    if (score >= 80) return "¡Muy bien! Estás listo para el examen.";
    if (score >= 60) return "Bien, pero repasa los temas donde fallaste.";
    return "Necesitas estudiar más. Revisa las grabaciones y notas.";
  };

  const handleFinish = () => {
    const answeredCount = Object.keys(answers).length;
    if (activeExam && answeredCount < activeExam.questions.length) {
      if(!window.confirm(`Solo has respondido ${answeredCount} de ${activeExam.questions.length} preguntas. ¿Seguro que quieres terminar?`)) {
        return;
      }
    }
    setShowResults(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetExam = () => {
    setActiveExam(null);
    setAnswers({});
    setShowResults(false);
  };

  if (activeExam) {
    const score = calculateScore();
    const correctCount = getCorrectCount();
    const isPassing = score >= 70;

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button 
          onClick={resetExam}
          className="mb-6 text-sm text-slate-500 hover:text-brand-primary flex items-center"
        >
          ← Volver a la lista
        </button>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
          <div className="bg-stone-900 px-6 py-4 border-b border-stone-800 flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">{activeExam.title}</h2>
            {!showResults && (
              <span className="text-stone-400 text-sm font-medium">
                Pregunta {Object.keys(answers).length} / {activeExam.questions.length}
              </span>
            )}
          </div>

          <div className="p-6 md:p-8">
            {showResults ? (
              <div className="text-center py-8">
                <div className="mb-8 flex flex-col items-center animate-fade-in-up">
                  <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full border-8 text-4xl font-extrabold mb-4 shadow-sm transition-all ${isPassing ? 'border-green-500 text-green-600 bg-green-50' : 'border-red-500 text-red-600 bg-red-50'}`}>
                    {score}%
                  </div>
                  
                  <h3 className={`text-3xl font-bold mb-2 ${isPassing ? 'text-green-700' : 'text-red-700'}`}>
                    {isPassing ? '¡Aprobado!' : 'No Aprobado'}
                  </h3>
                  
                  <p className="text-stone-700 font-medium text-lg max-w-lg mx-auto mb-2">
                    {getFeedbackMessage(score)}
                  </p>

                  <div className="inline-block bg-stone-100 rounded-full px-4 py-1 text-sm text-stone-600 font-semibold">
                    Aciertos: {correctCount} de {activeExam.questions.length}
                  </div>
                </div>
                
                <div className="text-left space-y-6 mt-10 border-t border-slate-100 pt-8">
                  <h3 className="font-bold text-xl text-stone-800 pb-2">Revisión de Respuestas</h3>
                  {activeExam.questions.map((q, idx) => {
                    const isCorrect = answers[q.id] === q.correctAnswer;
                    return (
                      <div key={q.id} className={`p-5 rounded-xl border ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                        <div className="flex items-start gap-4">
                          {isCorrect ? <CheckCircleIcon className="text-green-600 w-6 h-6 shrink-0 mt-0.5" /> : <XCircleIcon className="text-red-600 w-6 h-6 shrink-0 mt-0.5" />}
                          <div className="flex-1">
                            <p className="font-bold text-stone-800 mb-3 text-lg">{idx + 1}. {q.text}</p>
                            
                            <div className="space-y-2">
                              <p className="text-sm text-stone-600 flex flex-col sm:flex-row sm:gap-2">
                                <span className="font-semibold min-w-[100px]">Tu respuesta:</span>
                                <span className={isCorrect ? 'text-green-700 font-bold' : 'text-red-700 font-bold'}>
                                  {q.options[answers[q.id]] || 'Sin responder'}
                                </span>
                              </p>
                              {!isCorrect && (
                                <p className="text-sm text-stone-600 flex flex-col sm:flex-row sm:gap-2">
                                  <span className="font-semibold min-w-[100px]">Correcta:</span>
                                  <span className="text-green-700 font-bold bg-green-100 px-2 rounded inline-block w-fit">
                                    {q.options[q.correctAnswer]}
                                  </span>
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-12 flex justify-center gap-4">
                  <button
                    onClick={resetExam}
                    className="px-8 py-3 bg-stone-200 text-stone-700 rounded-full font-bold hover:bg-stone-300 transition-colors"
                  >
                    Volver al Menú
                  </button>
                  <button
                    onClick={() => {
                        setAnswers({});
                        setShowResults(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-8 py-3 bg-brand-primary text-white rounded-full font-bold hover:bg-brand-secondary transition-colors shadow-lg"
                  >
                    Reintentar Examen
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {activeExam.questions.map((q, idx) => (
                  <div key={q.id} className="pb-6 border-b border-stone-100 last:border-0">
                    <h3 className="text-lg font-medium text-stone-800 mb-4">
                      <span className="text-brand-primary font-bold mr-2">{idx + 1}.</span>
                      {q.text}
                    </h3>
                    <div className="space-y-3 pl-4">
                      {q.options.map((opt, optIdx) => (
                        <label 
                          key={optIdx} 
                          className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                            answers[q.id] === optIdx 
                              ? 'border-brand-primary bg-brand-light ring-1 ring-brand-primary shadow-sm' 
                              : 'border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <input
                            type="radio"
                            name={q.id}
                            value={optIdx}
                            checked={answers[q.id] === optIdx}
                            onChange={() => handleSelectOption(q.id, optIdx)}
                            className="h-4 w-4 text-brand-primary focus:ring-brand-primary border-gray-300 accent-brand-primary"
                          />
                          <span className={`ml-3 ${answers[q.id] === optIdx ? 'text-brand-primary font-medium' : 'text-stone-700'}`}>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="pt-6 flex justify-end">
                  <button
                    onClick={handleFinish}
                    className="px-8 py-3 bg-stone-900 text-white rounded-lg font-bold hover:bg-stone-700 transition-colors shadow-lg transform hover:-translate-y-0.5"
                  >
                    Terminar y Calificar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-orange-100 rounded-full mb-4">
            <ClipboardIcon className="h-8 w-8 text-orange-600" />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900">Exámenes Simulacro</h2>
        <p className="mt-4 text-lg text-slate-600">
          Pon a prueba tus conocimientos antes del examen real.
        </p>
      </div>

      <div className="flex justify-center mb-10">
        <div className="bg-slate-100 p-1.5 rounded-full inline-flex shadow-inner">
          {partials.map((p) => (
            <button
              key={p}
              onClick={() => setSelectedParcial(p)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                selectedParcial === p
                  ? 'bg-white text-brand-primary shadow-md'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {p === 1 ? 'Primer' : p === 2 ? 'Segundo' : 'Tercer'} Parcial
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExams.map((exam) => {
          const isLocked = !exam.isFree && !user;
          return (
            <div key={exam.id} className="bg-white rounded-xl shadow-sm hover:shadow-md border border-slate-200 p-6 flex flex-col transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-lg ${isLocked ? 'bg-slate-100' : 'bg-orange-50'}`}>
                  {isLocked ? <LockIcon className="text-slate-400 w-6 h-6" /> : <ClipboardIcon className="text-orange-500 w-6 h-6" />}
                </div>
                {exam.isFree && (
                  <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">GRATIS</span>
                )}
              </div>
              
              <h3 className="text-lg font-bold text-stone-900 mb-2">{exam.title}</h3>
              <p className="text-stone-600 text-sm mb-6 flex-1">{exam.description}</p>
              
              <div className="flex items-center text-xs text-stone-400 mb-4 space-x-3">
                 <span>{exam.questions.length} Preguntas</span>
                 <span>•</span>
                 <span>Opción Múltiple</span>
              </div>

              <button
                onClick={() => handleStartExam(exam)}
                className={`w-full py-2.5 rounded-lg font-bold text-sm transition-colors ${
                  isLocked 
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200' 
                  : 'bg-stone-900 text-white hover:bg-stone-800 shadow-md'
                }`}
              >
                {isLocked ? 'Exclusivo Alumnos' : 'Comenzar Examen'}
              </button>
            </div>
          );
        })}
        {filteredExams.length === 0 && (
           <div className="col-span-full text-center py-12 border-2 border-dashed border-slate-200 rounded-xl">
             <p className="text-slate-400">No hay exámenes disponibles para este parcial aún.</p>
           </div>
        )}
      </div>
    </div>
  );
};
