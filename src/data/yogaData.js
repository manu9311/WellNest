// ============================================================
// FILE: src/data/yogaData.js
// TYPE: Pure data file (no JSX, no UI)
// PURPOSE: Step-by-step yoga poses for each health condition.
//
// STRUCTURE OF EACH YOGA PLAN:
//   conditionId     → matches id in healthData.js
//   sequenceTitle   → name of the full sequence
//   duration        → total time for the sequence
//   bestTime        → when to practice (morning, evening etc.)
//   intro           → a short note about this practice
//   poses           → array of pose objects (see below)
//   breathwork      → 1-2 breathing exercises for the condition
//
// EACH POSE HAS:
//   id              → unique string
//   name            → English name
//   sanskritName    → Sanskrit name
//   duration        → how long to hold
//   difficulty      → "beginner" | "intermediate" | "advanced"
//   benefits        → why this pose helps this condition
//   steps           → numbered step-by-step instructions (array)
//   breathingCue    → what to do with breath during the pose
//   modification    → easier version for beginners
//   avoid           → who should skip this pose
//   imageKeyword    → keyword for image search (for UI later)
// ============================================================


// ─────────────────────────────────────────────
// DIFFICULTY COLORS (used by UI)
// ─────────────────────────────────────────────

export const DIFFICULTY_COLORS = {
  beginner:     { bg: '#D1FAE5', color: '#065F46', label: 'Beginner' },
  intermediate: { bg: '#FEF3C7', color: '#92400E', label: 'Intermediate' },
  advanced:     { bg: '#FEE2E2', color: '#991B1B', label: 'Advanced' },
}


// ─────────────────────────────────────────────
// YOGA PLANS
// ─────────────────────────────────────────────

export const YOGA_PLANS = {

  // ══════════════════════════════════════════
  // BLOATING
  // ══════════════════════════════════════════
  bloating: {
    conditionId: 'bloating',
    sequenceTitle: 'Gas-Releasing & Digestive Flow Sequence',
    duration: '20–25 minutes',
    bestTime: 'Morning on empty stomach OR 2 hours after a meal',
    intro: 'These poses directly compress and massage the digestive tract, stimulating peristalsis and releasing trapped gas. Practice in order for best results.',
    poses: [
      {
        id: 'pawanmuktasana',
        name: 'Wind-Relieving Pose',
        sanskritName: 'Pawanmuktasana',
        duration: '1 minute each side, then both legs',
        difficulty: 'beginner',
        benefits: 'Directly compresses the ascending and descending colon, releasing trapped gas. One of the fastest-acting poses for immediate bloating relief.',
        steps: [
          'Lie flat on your back on a yoga mat. Let your body relax completely.',
          'Take a deep breath in. As you exhale, bend your right knee and draw it toward your chest.',
          'Interlace your fingers just below your right knee, or hold your shin.',
          'Gently press the knee into your abdomen. You should feel gentle pressure on the right side of your belly.',
          'Hold this position and take 5 slow, deep breaths. With each exhale, gently squeeze the knee a little closer.',
          'Release the right leg. Now draw the left knee in and repeat the same process.',
          'Finally, draw BOTH knees to your chest simultaneously, hugging them tightly.',
          'Optional: Rock gently side to side to massage the lower back and further stimulate digestion.',
          'Hold both knees for 1 minute, breathing deeply into your belly.',
        ],
        breathingCue: 'Inhale to prepare, exhale deeply as you draw the knee in. Let your belly soften with each exhale.',
        modification: 'If you cannot reach your knee, place a folded blanket under your hips or use a yoga strap around the knee.',
        avoid: 'Avoid if you have a recent abdominal surgery, hernia, or are pregnant.',
        imageKeyword: 'pawanmuktasana wind relieving pose yoga',
      },
      {
        id: 'supta_matsyendrasana',
        name: 'Supine Spinal Twist',
        sanskritName: 'Supta Matsyendrasana',
        duration: '1–2 minutes each side',
        difficulty: 'beginner',
        benefits: 'Wrings out the digestive organs like a wet cloth, stimulating blood flow and peristalsis. Creates a massaging effect on the intestines.',
        steps: [
          'Lie on your back with both legs extended.',
          'Draw your right knee to your chest.',
          'Extend your right arm out to the side at shoulder height, palm facing down.',
          'Using your left hand, gently guide your right knee across your body to the left side.',
          'Your right knee may or may not touch the floor — do not force it.',
          'Turn your head to look over your right shoulder. This creates the full spinal twist.',
          'Relax your right shoulder toward the floor. It is okay if it lifts slightly.',
          'Hold here and breathe deeply for 5–8 breaths. With each exhale, allow yourself to sink a little deeper.',
          'To come out: inhale and use your core to bring your knee back to center. Extend your leg.',
          'Repeat on the opposite side.',
        ],
        breathingCue: 'Inhale to lengthen and create space. Exhale to deepen the twist. Never force the twist on an inhale.',
        modification: 'Place a folded blanket under your bent knee if it does not reach the floor comfortably.',
        avoid: 'Be gentle if you have lower back issues. Never force the knee to the ground.',
        imageKeyword: 'supta matsyendrasana supine spinal twist yoga',
      },
      {
        id: 'balasana_bloating',
        name: "Child's Pose",
        sanskritName: 'Balasana',
        duration: '2–3 minutes',
        difficulty: 'beginner',
        benefits: 'Gently compresses the abdomen while calming the nervous system. Activates the parasympathetic (rest-and-digest) response which is essential for proper digestion.',
        steps: [
          'Come to hands and knees on your mat (tabletop position).',
          'Bring your big toes together and separate your knees to about hip-width apart, or wider for more belly space.',
          'Sit your hips back toward your heels.',
          'Walk your hands forward until your forehead rests on the mat.',
          'Let your arms extend forward, palms flat, or rest them alongside your body with palms facing up.',
          'Close your eyes. Breathe deeply into your lower back and sides of the ribcage.',
          'Feel your belly gently pressing against your thighs with each inhale.',
          'With each exhale, sink your hips a little closer to your heels.',
          'Stay here for 2–3 minutes, completely surrendering the weight of your body to the floor.',
        ],
        breathingCue: 'Breathe into your lower back. Feel your back body rise on each inhale and fall on each exhale.',
        modification: 'Place a rolled blanket between your thighs and calves if your hips do not reach your heels.',
        avoid: 'Avoid if you have knee injuries. If ankles are uncomfortable, place a blanket under them.',
        imageKeyword: "balasana child's pose yoga",
      },
      {
        id: 'marjariasana',
        name: 'Cat-Cow Pose',
        sanskritName: 'Marjariasana-Bitilasana',
        duration: '3 minutes (continuous flow)',
        difficulty: 'beginner',
        benefits: 'The gentle spinal wave massages the entire digestive tract from stomach to intestines. Increases blood flow to digestive organs with every movement.',
        steps: [
          'Come to tabletop position: hands directly under shoulders, knees directly under hips.',
          'Your spine should be in a neutral position, parallel to the floor.',
          'COW pose: Inhale slowly. Let your belly drop toward the floor, lift your chest and chin upward, and let your tailbone rise toward the ceiling. Your spine makes a U-shape.',
          'CAT pose: Exhale slowly. Press the floor away, round your spine toward the ceiling like an angry cat. Tuck your chin to chest and tailbone under. Your spine makes an arch.',
          'Flow between these two shapes continuously, coordinating each movement with your breath.',
          'Make the movement slow and fluid — this is not an exercise, it is a massage.',
          'After 1 minute, begin to slow down. Make the movements smaller and more subtle.',
          'Eventually come to stillness in the neutral tabletop position.',
          'Take 3 deep breaths and notice the warmth in your spine and belly.',
        ],
        breathingCue: 'Inhale for Cow (belly drops, chest lifts). Exhale for Cat (spine rounds, chin tucks). Let breath lead the movement.',
        modification: 'If wrists hurt, come onto your fists or use yoga blocks under your hands.',
        avoid: 'Move gently if you have neck issues — keep neck movement minimal and never force it.',
        imageKeyword: 'cat cow pose marjariasana bitilasana yoga flow',
      },
    ],
    breathwork: [
      {
        name: 'Agni Sara (Digestive Fire Breath)',
        duration: '3 minutes',
        steps: [
          'Stand with feet hip-width, bend knees slightly, hands on thighs.',
          'Exhale completely through the mouth.',
          'Hold the breath OUT and rapidly pump your belly in and out.',
          'Do 10–15 belly pumps, then inhale when you need air.',
          'Rest for one normal breath cycle, then repeat.',
          'Do 5 rounds total.',
        ],
        benefit: 'Directly stimulates digestive fire (Agni), massages intestines, and relieves gas.',
        avoid: 'Do not practice if pregnant, menstruating, or if you have high blood pressure.',
      },
    ],
  },


  // ══════════════════════════════════════════
  // GERD
  // ══════════════════════════════════════════
  gerd: {
    conditionId: 'gerd',
    sequenceTitle: 'Acid-Calming Gentle Sequence (No Inversions)',
    duration: '20 minutes',
    bestTime: 'Evening, at least 2 hours after last meal. Never practice on a full stomach.',
    intro: 'IMPORTANT: Avoid all full inversions (headstand, shoulderstand) as they can worsen reflux. This sequence focuses on calming the nervous system and strengthening the diaphragm without triggering reflux.',
    poses: [
      {
        id: 'vajrasana',
        name: 'Thunderbolt Pose',
        sanskritName: 'Vajrasana',
        duration: '5–10 minutes after meals',
        difficulty: 'beginner',
        benefits: 'The only pose recommended directly after eating. Increases blood flow to the digestive system. Reduces acid reflux when practiced consistently after meals.',
        steps: [
          'Kneel on your mat. Place your knees together or hip-width apart.',
          'Sit back onto your heels. Your big toes may touch or be slightly apart.',
          'Sit up tall. Stack your head over your shoulders over your hips.',
          'Rest your hands on your thighs, palms facing down.',
          'Close your eyes or soften your gaze.',
          'Breathe naturally and deeply. Keep your spine completely upright — do not lean forward.',
          'If you feel discomfort in your knees, place a folded blanket between your calves and thighs.',
          'Sit here for 5–10 minutes after every meal.',
          'To come out: lean forward onto your hands, curl your toes under, and slowly rise to standing.',
        ],
        breathingCue: 'Slow, natural, diaphragmatic breathing. Inhale expanding the belly, exhale softly.',
        modification: 'Use a yoga block or rolled blanket between your heels and sitting bones for knee comfort.',
        avoid: 'Avoid if you have serious knee injuries. Never round the spine forward.',
        imageKeyword: 'vajrasana thunderbolt pose yoga sitting',
      },
      {
        id: 'setu_bandhasana_gerd',
        name: 'Bridge Pose',
        sanskritName: 'Setu Bandhasana',
        duration: '5 breaths, 3 repetitions',
        difficulty: 'beginner',
        benefits: 'Strengthens the diaphragm — a weak diaphragm is a key cause of GERD as it supports the lower oesophageal sphincter. This pose directly targets the root cause.',
        steps: [
          'Lie on your back. Bend your knees and place your feet flat on the floor, hip-width apart.',
          'Place your feet close enough to your hips that you can touch your heels with your fingertips.',
          'Rest your arms alongside your body, palms facing down.',
          'Press your feet firmly into the floor. Engage your core.',
          'Inhale, then as you exhale, press through your feet and lift your hips toward the ceiling.',
          'Lift as high as is comfortable. Keep your knees hip-width — do not let them splay out.',
          'Optional: interlace your fingers under your back and press your arms into the floor.',
          'Hold for 5 slow breaths. Keep your chin slightly tucked to protect your neck.',
          'To come down: exhale and lower your hips slowly, one vertebra at a time.',
          'Rest for 5 breaths between repetitions.',
        ],
        breathingCue: 'Exhale to lift up. Breathe naturally at the top. Exhale to slowly lower down.',
        modification: 'Place a yoga block under your sacrum for a supported, passive version.',
        avoid: 'Avoid if you have neck injuries. Keep the neck neutral — never turn your head in this pose.',
        imageKeyword: 'setu bandhasana bridge pose yoga',
      },
      {
        id: 'viparita_karani_gerd',
        name: 'Legs Up the Wall',
        sanskritName: 'Viparita Karani',
        duration: '10 minutes',
        difficulty: 'beginner',
        benefits: 'Activates the parasympathetic nervous system deeply, reducing the stress-driven acid production. One of the most therapeutic poses for any digestive condition.',
        steps: [
          'Sit sideways next to a wall with your hip touching the wall.',
          'Swing your legs up the wall as you lower your back to the floor in one smooth movement.',
          'Your sitting bones should be as close to the wall as comfortable — ideally touching it.',
          'Your legs are straight up the wall. Flex your feet gently.',
          'Rest your arms out to the sides, palms facing up.',
          'Close your eyes. Let your body become completely heavy.',
          'Feel your lower back release toward the floor.',
          'Stay here for 10 minutes. Set a timer so you do not have to think about time.',
          'To come out: bend your knees, slide your feet down the wall, roll to one side, and rest for a moment before sitting up.',
        ],
        breathingCue: 'Completely natural breathing. Let your body breathe itself. Notice the breath without controlling it.',
        modification: 'Place a folded blanket under your hips if your lower back lifts off the floor uncomfortably.',
        avoid: 'Avoid during menstruation (according to traditional yoga). Avoid if you have glaucoma or serious eye pressure issues.',
        imageKeyword: 'viparita karani legs up wall yoga restorative',
      },
    ],
    breathwork: [
      {
        name: 'Chandra Bhedana (Left Nostril Breathing)',
        duration: '5 minutes',
        steps: [
          'Sit comfortably with spine upright.',
          'Close your right nostril with your right thumb.',
          'Inhale slowly and deeply through your LEFT nostril only.',
          'Close the left nostril with your ring finger. Hold briefly.',
          'Release thumb and exhale through the RIGHT nostril.',
          'That is one round. Continue for 5 minutes.',
        ],
        benefit: 'Left nostril breathing activates the parasympathetic nervous system and is cooling — directly reduces acidity and heat-related digestive issues.',
        avoid: 'Avoid if you have nasal congestion.',
      },
    ],
  },


  // ══════════════════════════════════════════
  // PCOS
  // ══════════════════════════════════════════
  pcos: {
    conditionId: 'pcos',
    sequenceTitle: 'Hormone-Balancing & Reproductive Wellness Sequence',
    duration: '35–40 minutes',
    bestTime: 'Morning, ideally before breakfast. Or evening before dinner.',
    intro: 'This sequence focuses on opening the hips and pelvis, stimulating the reproductive organs, and activating the endocrine system. Consistency is more important than intensity — practice daily for best results.',
    poses: [
      {
        id: 'baddha_konasana',
        name: 'Butterfly Pose',
        sanskritName: 'Baddha Konasana',
        duration: '3–5 minutes',
        difficulty: 'beginner',
        benefits: 'Opens the hips and groin, directly stimulates the ovaries and uterus, improves blood circulation to the reproductive organs. One of the most beneficial poses for PCOS.',
        steps: [
          'Sit on your mat with your legs extended in front of you.',
          'Bend both knees and bring the soles of your feet together in front of you.',
          'Hold your feet with both hands, interlacing your fingers around them.',
          'Sit up as tall as possible. Lengthen through the crown of your head.',
          'Allow your knees to fall out to the sides toward the floor — do not force them down.',
          'Take a deep breath in. As you exhale, gently hinge forward from your hips, keeping your spine long.',
          'Go only as far as your body allows without rounding your lower back.',
          'Rest here and breathe. With each exhale, allow a little more release in the hips.',
          'Optional: gently flutter your knees up and down like butterfly wings (5–10 times) before settling.',
          'Stay for 3–5 minutes. Rise on an inhale.',
        ],
        breathingCue: 'Inhale to lengthen the spine, exhale to gently fold forward. Let the hips open with each breath.',
        modification: 'Sit on a folded blanket to tilt the pelvis forward if your lower back rounds easily.',
        avoid: 'Be gentle if you have groin or inner thigh injuries.',
        imageKeyword: 'baddha konasana butterfly pose yoga',
      },
      {
        id: 'supta_baddha_konasana',
        name: 'Reclined Butterfly Pose',
        sanskritName: 'Supta Baddha Konasana',
        duration: '5–10 minutes',
        difficulty: 'beginner',
        benefits: 'Deeply opens the hips and pelvis while fully relaxing the body. Reduces cortisol (a key driver of PCOS). Creates space for the reproductive organs.',
        steps: [
          'Start in Baddha Konasana (butterfly) as described above.',
          'Place your hands behind you on the mat.',
          'Slowly lower your back toward the floor, supporting yourself with your hands.',
          'Once your back is on the floor, place your arms alongside your body or extend them out to the sides.',
          'Let the weight of gravity do all the work. Do not actively push your knees down.',
          'Close your eyes. Take a full body scan from feet to head, consciously releasing tension.',
          'Breathe deeply into your pelvic region. Visualise warmth and healing energy in the lower abdomen.',
          'Stay here for 5–10 minutes. This is a restorative pose — the longer the better.',
          'To come out: use your hands to press your knees together, then roll to one side and sit up.',
        ],
        breathingCue: 'Deep belly breathing. Expand the lower abdomen on each inhale. Complete surrender on each exhale.',
        modification: 'Place yoga blocks or folded blankets under your outer thighs for support if the stretch is too intense.',
        avoid: 'Avoid if you have a groin injury. Provide extra support for lower back if needed.',
        imageKeyword: 'supta baddha konasana reclined butterfly yoga restorative',
      },
      {
        id: 'bhujangasana_pcos',
        name: 'Cobra Pose',
        sanskritName: 'Bhujangasana',
        duration: '30 seconds, 3–5 repetitions',
        difficulty: 'beginner',
        benefits: 'Stimulates the adrenal glands, helping regulate cortisol production. Opens the chest and improves thyroid function. Stretches the ovaries and uterus area.',
        steps: [
          'Lie face down on your mat. Legs together or slightly apart.',
          'Place your palms flat on the floor directly under your shoulders.',
          'Press the tops of your feet and your pubic bone into the floor.',
          'Inhale slowly and press your hands into the floor to lift your chest.',
          'Keep your elbows slightly bent — this is important. Do not lock them.',
          'Lift only as high as is comfortable for your lower back.',
          'Roll your shoulders back and down away from your ears.',
          'Keep your gaze forward or slightly upward — do not strain the neck back.',
          'Hold for 5 breaths, feeling your chest open and spine extend.',
          'Exhale and slowly lower back down with control.',
          'Rest with your forehead on the mat between repetitions.',
        ],
        breathingCue: 'Inhale as you rise up. Breathe fully at the top. Exhale as you lower down.',
        modification: 'Keep elbows close to body and only lift as high as feels comfortable. This is called Baby Cobra.',
        avoid: 'Avoid if you have a wrist injury or herniated disc. Pregnant women should not practice this pose.',
        imageKeyword: 'bhujangasana cobra pose yoga backbend',
      },
      {
        id: 'setu_bandhasana_pcos',
        name: 'Bridge Pose',
        sanskritName: 'Setu Bandhasana',
        duration: '1 minute, 3 repetitions',
        difficulty: 'beginner',
        benefits: 'Stimulates the thyroid and pituitary glands which are part of the hormonal axis. Strengthens the pelvic floor. Improves blood flow to the reproductive organs.',
        steps: [
          'Lie on your back. Bend knees, feet flat on floor hip-width apart.',
          'Feet should be close enough to your body that your fingertips can just reach your heels.',
          'Arms alongside body, palms pressing into the floor.',
          'Inhale. On the exhale, press firmly through all four corners of both feet.',
          'Lift your hips toward the ceiling. Squeeze your glutes and inner thighs.',
          'Optional: walk your shoulders under your back and clasp your hands together.',
          'Your body makes a straight diagonal line from shoulders to knees.',
          'Hold for 5–8 slow breaths. Keep your thighs parallel — do not let knees fall out.',
          'Exhale and lower down slowly, one vertebra at a time from upper back to tailbone.',
          'Rest and repeat 3 times.',
        ],
        breathingCue: 'Exhale to lift. Breathe freely at the top. Exhale to lower with complete control.',
        modification: 'Place a yoga block under your sacrum for a supported passive version held for 3–5 minutes.',
        avoid: 'Avoid with neck injuries. Never turn the head when in bridge pose.',
        imageKeyword: 'setu bandhasana bridge pose yoga',
      },
    ],
    breathwork: [
      {
        name: 'Nadi Shodhana (Alternate Nostril Breathing)',
        duration: '10 minutes',
        steps: [
          'Sit with spine upright. Rest left hand on left knee.',
          'Bring right hand to your face. Place index and middle finger between your eyebrows.',
          'Use right thumb to close the right nostril.',
          'Inhale slowly through the LEFT nostril for a count of 4.',
          'Close BOTH nostrils. Hold the breath for a count of 4.',
          'Release the thumb. Exhale through the RIGHT nostril for a count of 8.',
          'Inhale through the RIGHT nostril for a count of 4.',
          'Close both. Hold for count of 4.',
          'Exhale through LEFT nostril for count of 8.',
          'That is one complete round. Continue for 10 minutes.',
        ],
        benefit: 'Balances the left and right hemispheres of the brain, directly regulates the hypothalamic-pituitary-adrenal (HPA) axis — the hormonal control system disrupted in PCOS.',
        avoid: 'Do not hold the breath if you have high blood pressure. Just breathe without retention.',
      },
    ],
  },


  // ══════════════════════════════════════════
  // HYPOTHYROIDISM
  // ══════════════════════════════════════════
  hypothyroidism: {
    conditionId: 'hypothyroidism',
    sequenceTitle: 'Thyroid-Activating Sequence',
    duration: '30 minutes',
    bestTime: 'Morning, before breakfast for maximum thyroid stimulation.',
    intro: 'The thyroid gland sits at the base of the throat. Poses that compress and then release the throat region directly stimulate thyroid tissue and improve blood flow to the gland.',
    poses: [
      {
        id: 'sarvangasana',
        name: 'Shoulder Stand',
        sanskritName: 'Sarvangasana',
        duration: '2–3 minutes (build up gradually)',
        difficulty: 'intermediate',
        benefits: 'The chin lock (Jalandhara Bandha) in this pose directly compresses and then massages the thyroid gland as you come in and out. Considered the most powerful yoga pose for thyroid health.',
        steps: [
          'Lie on your back with arms alongside your body.',
          'Bend your knees and bring them to your chest.',
          'Press your palms into the floor for momentum and swing your legs up over your head.',
          'Place your hands on your lower back for support, fingers pointing toward the spine.',
          'Straighten your legs toward the ceiling. Your weight rests on your shoulders and upper arms — NOT your neck.',
          'Tuck your chin gently into your chest (this is the thyroid-stimulating chin lock).',
          'Keep your elbows as close together as possible to create a stable base.',
          'Breathe slowly and deeply. Stay here for 1–3 minutes, building up over weeks.',
          'To come down: bend your knees, lower them slowly toward your forehead, then slowly roll down one vertebra at a time.',
          'Rest in Savasana for at least 1 minute after this pose.',
        ],
        breathingCue: 'Slow, controlled breathing. The chin lock creates resistance — breathe through it calmly.',
        modification: 'Use a folded blanket under your shoulders (NOT your neck) for support. Practice Legs-Up-the-Wall as a complete beginner substitute.',
        avoid: 'Avoid if you have neck injuries, high blood pressure, glaucoma, or are menstruating. Build up the duration very gradually.',
        imageKeyword: 'sarvangasana shoulder stand yoga pose',
      },
      {
        id: 'matsyasana',
        name: 'Fish Pose',
        sanskritName: 'Matsyasana',
        duration: '1–2 minutes',
        difficulty: 'beginner',
        benefits: 'The counter-pose to shoulderstand. Stretches the entire front of the throat, stimulating the thyroid through extension rather than compression. Always practiced after shoulderstand.',
        steps: [
          'Lie on your back with legs straight.',
          'Place your hands under your hips, palms facing down.',
          'Press your forearms and elbows firmly into the floor.',
          'Inhale and press through your elbows to lift your chest high.',
          'Tilt your head back and allow the crown of your head to rest on the floor — but very little weight goes on the head.',
          'Most of the weight is on your elbows and forearms.',
          'Your chest should feel like it is opening toward the ceiling.',
          'Keep your legs active — press through your heels.',
          'Hold for 5–10 breaths. Feel the stretch across the front of your throat.',
          'To come out: press through elbows to lift your head, then slowly lower your back down.',
        ],
        breathingCue: 'Breathe deeply into your chest and throat. Each inhale lifts and opens. Each exhale deepens the release.',
        modification: 'Place a yoga block under your upper back for a supported version. Bend your knees if lower back is uncomfortable.',
        avoid: 'Avoid with neck injuries. Do not place too much weight on the crown of the head.',
        imageKeyword: 'matsyasana fish pose yoga throat stretch',
      },
      {
        id: 'ustrasana',
        name: 'Camel Pose',
        sanskritName: 'Ustrasana',
        duration: '30 seconds, 3 repetitions',
        difficulty: 'intermediate',
        benefits: 'Deep backbend that powerfully opens the throat region and stretches the front of the neck — directly stimulating thyroid and parathyroid glands.',
        steps: [
          'Kneel on your mat with knees hip-width apart.',
          'Place your hands on your lower back, fingers pointing down.',
          'Tuck your toes under (this makes it more accessible).',
          'Inhale and press your hips forward as you begin to bend backward.',
          'Open your chest toward the ceiling. Keep pressing your hips forward throughout.',
          'If comfortable, reach your hands back to hold your heels one at a time.',
          'Let your head drop back gently — or keep chin tucked if neck is sensitive.',
          'Hold for 5 slow breaths. Feel the stretch across the front of your throat and chest.',
          'To come out: bring hands back to lower back, engage core, and rise back up to kneeling slowly.',
          'Rest in Child\'s Pose immediately after.',
        ],
        breathingCue: 'Inhale to open and lift. Breathe into the chest and throat at the top. Exhale to come out slowly.',
        modification: 'Keep hands on lower back and do not reach for heels if that causes strain. This partial version is still highly effective.',
        avoid: 'Avoid with serious back or neck injuries, high blood pressure, or migraine.',
        imageKeyword: 'ustrasana camel pose yoga backbend',
      },
    ],
    breathwork: [
      {
        name: 'Ujjayi Pranayama (Ocean Breath)',
        duration: '10 minutes',
        steps: [
          'Sit comfortably with spine upright.',
          'Slightly constrict the back of your throat, as if you are about to fog up a mirror.',
          'Now close your mouth and breathe through your nose while maintaining that constriction.',
          'You should hear a soft oceanic sound — like the sound of the ocean in a shell.',
          'Inhale for a count of 4, creating the sound.',
          'Exhale for a count of 6, creating the same sound.',
          'Continue for 10 minutes.',
        ],
        benefit: 'The vibration created in the throat directly stimulates the thyroid tissue through mechanical resonance. Also builds internal heat which supports a sluggish metabolism.',
        avoid: 'Stop if you feel dizzy or light-headed.',
      },
    ],
  },


  // ══════════════════════════════════════════
  // ANXIETY
  // ══════════════════════════════════════════
  anxiety: {
    conditionId: 'anxiety',
    sequenceTitle: 'Nervous System Reset — Parasympathetic Activation Sequence',
    duration: '30–40 minutes',
    bestTime: 'Evening, 1 hour before bed. Or any time during an anxiety episode.',
    intro: 'Every pose in this sequence is chosen for its ability to activate the vagus nerve and parasympathetic (rest-and-digest) nervous system. These poses shift you from fight-or-flight into a state of genuine calm.',
    poses: [
      {
        id: 'balasana_anxiety',
        name: "Child's Pose",
        sanskritName: 'Balasana',
        duration: '3–5 minutes',
        difficulty: 'beginner',
        benefits: 'The forehead touching the earth activates the relaxation response almost instantly. Compresses the belly, stimulating the vagus nerve. One of the fastest anxiety-relieving yoga poses.',
        steps: [
          'Come to hands and knees.',
          'Sit your hips back to your heels.',
          'Extend your arms forward on the mat, forehead resting on the floor.',
          'Let your entire body become heavy.',
          'Close your eyes. Feel the coolness of the floor on your forehead.',
          'Place one hand on top of the other if you prefer.',
          'Take 10 very slow breaths — longer exhale than inhale.',
          'Count: inhale for 4 counts, exhale for 8 counts.',
          'With each exhale, silently say the word "release" in your mind.',
          'Stay as long as needed. There is nowhere to be.',
        ],
        breathingCue: 'Extended exhale is key. Make your exhale twice as long as your inhale. This is what activates the vagus nerve.',
        modification: 'Place a pillow or bolster on your thighs and rest your torso on it for full support.',
        avoid: 'Avoid with knee injuries. Use support if hips do not reach heels.',
        imageKeyword: "child's pose balasana yoga anxiety relief",
      },
      {
        id: 'viparita_karani_anxiety',
        name: 'Legs Up the Wall',
        sanskritName: 'Viparita Karani',
        duration: '10–15 minutes',
        difficulty: 'beginner',
        benefits: 'Reverses blood flow, calms the cardiovascular system, drains accumulated stress hormones from the legs. Widely considered the most powerful restorative yoga pose for anxiety.',
        steps: [
          'Place your mat against a wall.',
          'Sit sideways next to the wall with your hip touching it.',
          'Swing your legs up the wall as you lower your back to the floor.',
          'Your sitting bones should be touching or very close to the wall.',
          'Legs are straight up the wall. If hamstrings are tight, move slightly away from the wall.',
          'Rest arms out to sides, palms open and facing up.',
          'Place a folded blanket under your head if needed.',
          'Set a timer for 10–15 minutes. Close your eyes completely.',
          'Scan your body from feet to head, consciously releasing each area.',
          'Allow your mind to drift. Do not try to control thoughts — just observe them.',
          'To come out: bend knees, slide feet down the wall, roll to one side, stay for 1 minute, then sit up slowly.',
        ],
        breathingCue: 'Natural breathing only. No control needed. Let your body breathe itself completely.',
        modification: 'Place a bolster or folded blankets under your hips to elevate them for deeper venous drainage.',
        avoid: 'Avoid during menstruation according to traditional yoga. Avoid with glaucoma or serious spinal issues.',
        imageKeyword: 'viparita karani legs up wall yoga anxiety',
      },
    ],
    breathwork: [
      {
        name: '4-7-8 Breathing',
        duration: '5–10 minutes (minimum 4 cycles)',
        steps: [
          'Sit or lie comfortably. Place the tip of your tongue on the ridge just behind your upper front teeth.',
          'Exhale completely through your mouth with a whooshing sound.',
          'Close your mouth. Inhale quietly through your nose for a count of FOUR.',
          'Hold your breath for a count of SEVEN.',
          'Exhale completely through your mouth with a whooshing sound for a count of EIGHT.',
          'That is one breath cycle. Repeat 4 times minimum.',
          'Practise twice daily — upon waking and before sleep.',
          'After one month of daily practice, you can increase to 8 cycles.',
        ],
        benefit: 'Developed by Dr. Andrew Weil based on pranayama. The 7-count hold builds CO2 which directly signals the brain to switch off the fight-or-flight response. Results are felt within 2 cycles.',
        avoid: 'If holding breath causes dizziness, reduce the count ratio. Start with 4-4-6 if needed.',
      },
      {
        name: 'Bhramari (Humming Bee Breath)',
        duration: '5 minutes',
        steps: [
          'Sit comfortably. Close your eyes.',
          'Place your index fingers gently in your ears (or just close the ear flap with your thumbs).',
          'Inhale deeply through your nose.',
          'On the exhale, make a continuous humming sound like a bee: "mmmmmm".',
          'Feel the vibration in your skull, throat, and chest.',
          'Continue for 5 minutes — one long hum per exhale.',
        ],
        benefit: 'The humming vibration stimulates the vagus nerve and creates nitric oxide in the sinuses which has a direct calming effect on the nervous system.',
        avoid: 'Practice in a quiet space. Do not practice lying down.',
      },
    ],
  },


  // ══════════════════════════════════════════
  // LOW IMMUNITY
  // ══════════════════════════════════════════
  low_immunity: {
    conditionId: 'low_immunity',
    sequenceTitle: 'Lymphatic Flow & Immunity-Boosting Sequence',
    duration: '30 minutes',
    bestTime: 'Morning, ideally with sunlight if possible.',
    intro: 'The lymphatic system has no pump — unlike blood, lymph only moves with body movement. This sequence is designed to stimulate lymphatic flow, activate the thymus gland (immune organ), and increase oxygenation of all tissues.',
    poses: [
      {
        id: 'surya_namaskar',
        name: 'Sun Salutation',
        sanskritName: 'Surya Namaskar',
        duration: '12 rounds (start with 3 if new)',
        difficulty: 'beginner',
        benefits: 'A complete full-body sequence that activates every major muscle group, stimulates all lymph nodes, increases heart rate for immune system benefits, and builds internal heat.',
        steps: [
          'Stand at the front of your mat in Mountain Pose (Tadasana). Feet together, hands at heart centre.',
          'STEP 1 — Prayer Pose: Inhale, bring palms together at heart.',
          'STEP 2 — Raised Arms: Inhale, sweep arms overhead. Gently arch back.',
          'STEP 3 — Standing Forward Fold: Exhale, fold forward, hands to floor beside feet.',
          'STEP 4 — Low Lunge: Inhale, step your RIGHT foot back into a lunge. Left knee over left ankle.',
          'STEP 5 — Plank: Hold the breath or exhale, step left foot back to plank. Body is one straight line.',
          'STEP 6 — Eight-Limbed Pose: Exhale, lower knees, chest, and chin to the floor. Hips stay up.',
          'STEP 7 — Cobra: Inhale, press hands down and lift chest into Cobra Pose.',
          'STEP 8 — Downward Dog: Exhale, press up into an inverted V shape. Hold for 3 breaths.',
          'STEP 9 — Low Lunge: Inhale, step your RIGHT foot forward between your hands.',
          'STEP 10 — Forward Fold: Exhale, step left foot forward. Fold.',
          'STEP 11 — Raised Arms: Inhale, sweep arms up overhead.',
          'STEP 12 — Mountain Pose: Exhale, bring hands to heart. That is half a round.',
          'Repeat with the LEFT leg stepping back first to complete one full round.',
        ],
        breathingCue: 'Each movement coordinates with either an inhale or exhale as noted. Move fluidly like a wave.',
        modification: 'Replace plank with knees-down plank. Replace Cobra with a simple chest lift. Move slowly.',
        avoid: 'Avoid full Surya Namaskar if you have wrist, shoulder, or knee injuries. Modify accordingly.',
        imageKeyword: 'surya namaskar sun salutation yoga sequence steps',
      },
      {
        id: 'setu_bandhasana_immunity',
        name: 'Bridge Pose',
        sanskritName: 'Setu Bandhasana',
        duration: '1 minute, 5 repetitions',
        difficulty: 'beginner',
        benefits: 'Stimulates the thymus gland — the master gland of the immune system — by opening the chest. The thymus is where T-cells (immune fighters) mature.',
        steps: [
          'Lie on your back, knees bent, feet hip-width on floor close to hips.',
          'Arms alongside body, palms pressing into the floor.',
          'Press through your feet and exhale as you lift your hips.',
          'Roll your shoulders under and clasp your hands if comfortable.',
          'Lift your chest toward your chin — this is the thymus-opening action.',
          'Hold for 5–8 breaths with the chest lifted high.',
          'Lower slowly on an exhale.',
          'Rest briefly and repeat 5 times.',
        ],
        breathingCue: 'Exhale to lift. Breathe into the chest fully at the top to maximise thymus stimulation.',
        modification: 'Place a block under your sacrum for a supported version.',
        avoid: 'Neck injuries. Never turn the head during this pose.',
        imageKeyword: 'bridge pose yoga immunity thymus',
      },
    ],
    breathwork: [
      {
        name: 'Kapalabhati (Skull-Shining Breath)',
        duration: '5 minutes',
        steps: [
          'Sit comfortably with spine tall.',
          'Take a deep breath in to begin.',
          'Now exhale sharply and forcefully through your nose — this is a short, powerful exhale driven by your abdominal muscles.',
          'The inhale happens AUTOMATICALLY and passively. You do not actively inhale.',
          'Begin at a pace of one exhale per second.',
          'Build up to 2 exhales per second as you become comfortable.',
          'Do 3 rounds of 30–50 pumps, with normal breathing between rounds.',
        ],
        benefit: 'Generates significant internal heat, oxygenates all tissues, clears respiratory pathways (where many immune threats enter), and activates the lymphatic system through abdominal pumping.',
        avoid: 'Avoid if pregnant, menstruating, or if you have high blood pressure or epilepsy.',
      },
    ],
  },


  // ══════════════════════════════════════════
  // BRAIN FOG
  // ══════════════════════════════════════════
  brain_fog: {
    conditionId: 'brain_fog',
    sequenceTitle: 'Clarity & Focus — Brain-Activating Sequence',
    duration: '25 minutes',
    bestTime: 'Morning before work. Or midday when brain fog is worst.',
    intro: 'Inversions and forward folds increase blood flow to the brain. Pranayama oxygenates brain tissue. This sequence directly targets the physical causes of brain fog.',
    poses: [
      {
        id: 'adho_mukha_svanasana',
        name: 'Downward-Facing Dog',
        sanskritName: 'Adho Mukha Svanasana',
        duration: '2–3 minutes',
        difficulty: 'beginner',
        benefits: 'A gentle inversion that increases blood flow to the brain without the risk of a full headstand. Elongates the spine, relieves tension from the neck (a major cause of brain fog).',
        steps: [
          'Start in tabletop position, hands and knees on the floor.',
          'Spread your fingers wide. Press all 10 fingertips into the mat.',
          'Tuck your toes under.',
          'Inhale. On the exhale, press your hips up and back toward the ceiling.',
          'Straighten your arms and legs as much as comfortable. Your body forms an inverted V.',
          'Press your chest toward your thighs. Let your head hang completely free between your arms.',
          'Keep a slight bend in your knees if your hamstrings are tight.',
          'Press your heels toward the floor (they do not need to touch).',
          'Hold for 5 breaths, then pedal your feet (bend one knee then the other) for 30 seconds.',
          'Return to stillness and hold for 5 more breaths.',
        ],
        breathingCue: 'Breathe into the back of your lungs. Feel each breath expand your back body.',
        modification: 'Bend your knees generously if hamstrings are tight. Use blocks under hands if wrists are uncomfortable.',
        avoid: 'Avoid with wrist injuries, uncontrolled high blood pressure, or late-stage pregnancy.',
        imageKeyword: 'adho mukha svanasana downward facing dog yoga',
      },
      {
        id: 'uttanasana',
        name: 'Standing Forward Fold',
        sanskritName: 'Uttanasana',
        duration: '2 minutes',
        difficulty: 'beginner',
        benefits: 'Powerful brain-blood-flow pose. Calms the nervous system, relieves headaches, and delivers fresh oxygenated blood to the brain within seconds.',
        steps: [
          'Stand with feet hip-width apart.',
          'Inhale and reach your arms overhead.',
          'Exhale and slowly fold forward from your hips (not your waist).',
          'Let your torso and head hang completely. Arms can hang or you can grab opposite elbows.',
          'Micro-bend your knees to protect the lower back.',
          'Nod your head "yes" and "no" very slowly to release neck tension.',
          'Stay here for 2 full minutes. Let gravity do the work.',
          'To come up: bend your knees, place hands on hips, and rise slowly to avoid a head rush.',
          'Once standing, pause for a moment before moving on.',
        ],
        breathingCue: 'Exhale to fold deeper. Breathe naturally while inverted. Take long slow breaths.',
        modification: 'Place hands on yoga blocks or a chair if you cannot reach the floor.',
        avoid: 'Rise up slowly to prevent dizziness. Avoid if you have glaucoma or inner ear issues.',
        imageKeyword: 'uttanasana standing forward fold yoga brain',
      },
    ],
    breathwork: [
      {
        name: 'Bhramari with Shanmukhi Mudra (Closing the Senses)',
        duration: '10 minutes',
        steps: [
          'Sit with spine tall.',
          'Place thumbs in ears, index fingers on forehead, middle fingers on closed eyes, ring fingers on nose (lightly), pinky fingers below lips.',
          'This closes off all external sensory input.',
          'Inhale deeply through the nose.',
          'On the exhale, hum: "mmmmmm" for the entire length of the exhale.',
          'Feel the vibration resonating through your skull.',
          'Continue for 10 minutes.',
        ],
        benefit: 'The vibration from humming creates nitric oxide in the sinuses, increases alpha brain waves (the focused, creative state), and measurably improves concentration and memory recall.',
        avoid: 'Practice in a quiet space. Not recommended when lying down.',
      },
    ],
  },


  // ══════════════════════════════════════════
  // BACK PAIN
  // ══════════════════════════════════════════
  back_pain: {
    conditionId: 'back_pain',
    sequenceTitle: 'Back Pain Relief & Core Strengthening Sequence',
    duration: '30 minutes',
    bestTime: 'Morning to prevent stiffness, and evening to release tension accumulated during the day.',
    intro: 'This sequence addresses the three root causes of most back pain: weak core, tight hip flexors, and poor spinal mobility. Practice daily for at least 21 days for lasting relief.',
    poses: [
      {
        id: 'cat_cow_back',
        name: 'Cat-Cow Flow',
        sanskritName: 'Marjariasana-Bitilasana',
        duration: '5 minutes',
        difficulty: 'beginner',
        benefits: 'Restores natural spinal mobility, lubricates the spinal discs with synovial fluid, relieves morning stiffness, and gently massages the muscles surrounding the spine.',
        steps: [
          'Come to tabletop: hands under shoulders, knees under hips.',
          'Ensure your wrists are directly below your shoulders.',
          'Start with a neutral spine — flat back like a tabletop.',
          'CAT — Exhale: Press the floor away and round your spine toward the ceiling. Tuck your chin and tailbone.',
          'Feel every vertebra stacking up toward the ceiling like a rainbow.',
          'COW — Inhale: Let your belly drop toward the floor. Lift your chest and tailbone simultaneously.',
          'Feel the stretch across your belly and the compression in your lower back.',
          'Flow between Cat and Cow continuously for 3 minutes, led by breath.',
          'For the final 2 minutes: make the movement smaller and slower. Find the place of least pain.',
          'End in neutral tabletop and take 5 deep breaths.',
        ],
        breathingCue: 'Exhale = Cat (round up). Inhale = Cow (drop down). Breath leads movement, always.',
        modification: 'Practice while seated in a chair if getting to the floor is painful.',
        avoid: 'Move gently. Never force the neck — keep movement minimal if you have cervical issues.',
        imageKeyword: 'cat cow yoga pose back pain relief',
      },
      {
        id: 'supta_padangusthasana',
        name: 'Reclined Hand-to-Big-Toe Pose',
        sanskritName: 'Supta Padangusthasana',
        duration: '2 minutes each side',
        difficulty: 'beginner',
        benefits: 'Stretches the hamstrings — the single most important muscle group for lower back pain. Tight hamstrings pull on the pelvis and create the tension that causes most lower back pain.',
        steps: [
          'Lie on your back with both legs extended.',
          'Bend your right knee and draw it to your chest.',
          'Hold the back of your right thigh, your calf, or use a yoga strap around the foot.',
          'Slowly straighten the right leg toward the ceiling as much as possible.',
          'Keep your left leg actively pressing into the floor — do not let it lift.',
          'Flex your right foot. Press through the heel.',
          'Hold here and breathe. With each exhale, gently draw the leg a little closer to you.',
          'After 2 minutes, slowly lower the leg. Pause. Switch sides.',
          'The leg does not need to be straight — gentle stretch is the goal.',
        ],
        breathingCue: 'Inhale to lengthen, exhale to gently deepen the stretch. Never pull aggressively.',
        modification: 'Use a yoga strap, belt, or towel around the foot if you cannot reach.',
        avoid: 'Be very gentle with any existing sciatica. Stop if pain radiates down the leg.',
        imageKeyword: 'supta padangusthasana reclined hamstring stretch yoga back',
      },
      {
        id: 'setu_bandhasana_back',
        name: 'Bridge Pose',
        sanskritName: 'Setu Bandhasana',
        duration: '30 seconds, 5 repetitions',
        difficulty: 'beginner',
        benefits: 'Strengthens the gluteus maximus — the most important muscle for spinal support. Weak glutes are a primary cause of lower back pain. Also stretches the hip flexors.',
        steps: [
          'Lie on your back, knees bent, feet flat on floor.',
          'Feet hip-width apart, close enough to your hips to create a right angle.',
          'Press your lower back gently into the floor.',
          'On an exhale, press through your feet and squeeze your glutes to lift your hips.',
          'Hold at the top for 5 breaths. Keep squeezing your glutes throughout.',
          'Make sure your knees stay in line with your hips — do not let them fall in or out.',
          'Exhale slowly and lower your hips, feeling each vertebra return to the floor.',
          'Rest for 5 breaths. Repeat 5 times.',
        ],
        breathingCue: 'Exhale to lift. Breathe freely at the top. Exhale with control to lower.',
        modification: 'Place a block between your knees to keep them aligned. Place a block under your sacrum for a passive version.',
        avoid: 'Avoid with neck injuries. Keep the head completely still.',
        imageKeyword: 'bridge pose yoga back pain core strength',
      },
    ],
    breathwork: [
      {
        name: 'Diaphragmatic Breathing (Belly Breathing)',
        duration: '10 minutes',
        steps: [
          'Lie on your back with knees bent, feet flat. Place one hand on your chest, one on your belly.',
          'Breathe in through your nose. Your belly hand should rise. Your chest hand should stay still.',
          'Exhale slowly through your nose. Your belly falls.',
          'If your chest is rising instead of your belly, you are chest breathing — this tightens back muscles.',
          'Practice making the belly rise exclusively for 10 minutes.',
          'Gradually extend: inhale for 4 counts, exhale for 6 counts.',
        ],
        benefit: 'Diaphragmatic breathing activates the deep core muscles (transverse abdominis) which directly support and protect the spine. Most back pain sufferers are chronic chest breathers.',
        avoid: 'No contraindications. This is safe for all.',
      },
    ],
  },


  // ══════════════════════════════════════════
  // INSULIN RESISTANCE
  // ══════════════════════════════════════════
  insulin_resistance: {
    conditionId: 'insulin_resistance',
    sequenceTitle: 'Metabolic Activation & Blood Sugar Regulating Sequence',
    duration: '30 minutes',
    bestTime: 'Morning before breakfast for maximum metabolic benefit.',
    intro: 'This sequence activates the pancreas, liver, and adrenal glands — the three organs most involved in blood sugar regulation. Combined with brisk walking after meals, this practice can produce measurable improvements in fasting blood sugar within 2 weeks.',
    poses: [
      {
        id: 'ardha_matsyendrasana',
        name: 'Half Spinal Twist',
        sanskritName: 'Ardha Matsyendrasana',
        duration: '1–2 minutes each side',
        difficulty: 'intermediate',
        benefits: 'Directly massages and stimulates the pancreas and liver — the two organs responsible for insulin production and glucose metabolism. One of the most important poses for insulin resistance.',
        steps: [
          'Sit on your mat with both legs extended.',
          'Bend your right knee and place your right foot on the floor outside your left thigh.',
          'You can keep your left leg extended or bend it with the left foot near your right hip.',
          'Sit up tall. This spinal elongation is essential before twisting.',
          'Inhale and lengthen your spine toward the ceiling.',
          'Exhale and twist your torso to the RIGHT.',
          'Place your right hand on the floor behind your right hip for support.',
          'Bring your left elbow to the OUTSIDE of your right knee — this creates the deep twist.',
          'With each inhale, grow taller. With each exhale, deepen the twist a little more.',
          'Hold for 1–2 minutes. Look over your right shoulder.',
          'To come out: inhale, unwind, and extend your legs. Pause, then switch sides.',
        ],
        breathingCue: 'Inhale = lengthen and create space. Exhale = twist deeper. Never force the twist. It unfolds naturally with breath.',
        modification: 'Keep the bottom leg straight if bending it causes discomfort. Use your hand on your knee instead of your elbow.',
        avoid: 'Avoid with serious spinal disc issues or recent abdominal surgery.',
        imageKeyword: 'ardha matsyendrasana half spinal twist yoga pancreas',
      },
      {
        id: 'mandukasana',
        name: 'Frog Pose',
        sanskritName: 'Mandukasana',
        duration: '1 minute, 3 repetitions',
        difficulty: 'beginner',
        benefits: 'Direct compression of the pancreatic region stimulates insulin-producing beta cells. Specifically recommended in Ayurvedic yoga therapy for diabetes management.',
        steps: [
          'Sit in Vajrasana (kneeling with hips on heels).',
          'Make fists with both hands. Place your thumb inside your fingers.',
          'Place both fists on your lower abdomen, just below the navel. One fist above the other.',
          'Inhale deeply.',
          'Exhale and lean forward, pressing your fists into your abdomen.',
          'Look straight ahead or slightly upward.',
          'Hold the position while holding the breath out for as long as comfortable.',
          'Inhale and sit back up.',
          'Rest for one normal breath. Repeat 3 times.',
        ],
        breathingCue: 'Exhale and fold forward pressing the fists in. Hold the breath out as long as comfortable. Inhale to rise.',
        modification: 'Use softer fists or just place flat palms on the belly if fists are uncomfortable.',
        avoid: 'Avoid with peptic ulcer, recent abdominal surgery, or pregnancy.',
        imageKeyword: 'mandukasana frog pose yoga pancreas diabetes',
      },
    ],
    breathwork: [
      {
        name: 'Bhastrika (Bellows Breath)',
        duration: '5 minutes',
        steps: [
          'Sit with spine tall.',
          'Take a few normal breaths to prepare.',
          'Inhale deeply and forcefully through your nose, expanding the belly.',
          'Exhale forcefully through the nose, contracting the belly.',
          'Both inhale and exhale are active and equal in force.',
          'This is unlike Kapalabhati where only exhale is forceful.',
          'Start at 1 breath per second. Do 20 breaths, then breathe normally for 1 minute.',
          'Repeat 3 rounds.',
        ],
        benefit: 'Generates significant internal heat which improves insulin sensitivity. Stimulates the pancreas through increased intra-abdominal pressure. Studies show it reduces fasting blood glucose with regular practice.',
        avoid: 'Avoid if pregnant, have high blood pressure, heart disease, or epilepsy.',
      },
    ],
  },


  // ══════════════════════════════════════════
  // ACNE
  // ══════════════════════════════════════════
  acne: {
    conditionId: 'acne',
    sequenceTitle: 'Detox & Hormone-Balancing Sequence for Clear Skin',
    duration: '25 minutes',
    bestTime: 'Morning on empty stomach.',
    intro: 'Acne is an internal condition. This sequence works by stimulating the liver (detoxification), balancing hormones through the endocrine system, and improving circulation to the skin.',
    poses: [
      {
        id: 'ardha_matsyendrasana_acne',
        name: 'Half Spinal Twist',
        sanskritName: 'Ardha Matsyendrasana',
        duration: '1–2 minutes each side',
        difficulty: 'intermediate',
        benefits: 'Squeezes and massages the liver — the primary detoxification organ. An overloaded liver is a major driver of hormonal acne. Also stimulates the adrenal glands.',
        steps: [
          'Sit with both legs extended.',
          'Bend right knee, place right foot on floor outside left thigh.',
          'Sit up very tall — imagine a string pulling the crown of your head up.',
          'Inhale and lengthen.',
          'Exhale and twist to the RIGHT, placing left elbow on outside of right knee.',
          'Right hand presses into the floor behind your right hip.',
          'With each inhale: grow taller. With each exhale: deepen the twist.',
          'Look over your right shoulder.',
          'Hold for 1–2 minutes breathing deeply.',
          'Unwind on an inhale and switch sides.',
        ],
        breathingCue: 'Inhale to create space and length. Exhale to squeeze deeper — imagine wringing out your liver.',
        modification: 'Hug the knee with your arm if the elbow-outside-knee position is too intense.',
        avoid: 'Avoid with severe back issues or post-abdominal surgery.',
        imageKeyword: 'spinal twist yoga liver detox skin',
      },
      {
        id: 'sarvangasana_acne',
        name: 'Shoulder Stand',
        sanskritName: 'Sarvangasana',
        duration: '2 minutes (or Legs-Up-Wall as substitute)',
        difficulty: 'intermediate',
        benefits: 'Inverts the circulation, draining stagnant blood from the face and stimulating fresh blood flow. Stimulates the thyroid which directly regulates hormonal balance.',
        steps: [
          'Lie on your back.',
          'Swing legs overhead with a press of the palms.',
          'Support your lower back with both hands, elbows pressing into the floor.',
          'Straighten legs toward the ceiling.',
          'Tuck chin to chest.',
          'Hold for 2 minutes, breathing slowly.',
          'Lower slowly: bend knees, roll down one vertebra at a time.',
          'Rest in Savasana for 2 minutes after.',
        ],
        breathingCue: 'Slow and controlled. The chin lock creates resistance — breathe calmly through it.',
        modification: 'Practice Legs-Up-the-Wall for all the same circulatory benefits with zero risk.',
        avoid: 'Avoid with neck injuries, high blood pressure, or during menstruation.',
        imageKeyword: 'shoulder stand yoga hormonal balance skin',
      },
    ],
    breathwork: [
      {
        name: 'Nadi Shodhana (Alternate Nostril Breathing)',
        duration: '10 minutes',
        steps: [
          'Sit comfortably with spine upright.',
          'Right hand in Vishnu mudra: index and middle finger folded to palm.',
          'Close right nostril with thumb. Inhale through LEFT nostril for 4 counts.',
          'Close both nostrils. Hold for 4 counts.',
          'Release thumb. Exhale through RIGHT nostril for 8 counts.',
          'Inhale through RIGHT nostril for 4.',
          'Close both. Hold for 4.',
          'Exhale through LEFT for 8.',
          'Continue for 10 minutes.',
        ],
        benefit: 'Directly balances the hormonal system through regulation of the autonomic nervous system. Reduces the cortisol that drives hormonal acne breakouts.',
        avoid: 'Do not hold breath if you have high blood pressure.',
      },
    ],
  },


  // ══════════════════════════════════════════
  // HAIR FALL
  // ══════════════════════════════════════════
  hair_fall: {
    conditionId: 'hair_fall',
    sequenceTitle: 'Scalp Circulation & Stress-Reducing Sequence',
    duration: '25 minutes',
    bestTime: 'Morning daily. The scalp massage and balayam can be done any time.',
    intro: 'Hair loss is strongly linked to poor scalp circulation and chronic stress. This sequence increases blood flow directly to the scalp and hair follicles, while the pranayama addresses the stress-related shedding (telogen effluvium).',
    poses: [
      {
        id: 'sirsasana_modified',
        name: 'Downward Dog (Headstand Preparation)',
        sanskritName: 'Adho Mukha Svanasana',
        duration: '3–5 minutes',
        difficulty: 'beginner',
        benefits: 'Maximum blood flow to the scalp without the risk of a full headstand. Regular practice nourishes hair follicles with oxygen-rich blood.',
        steps: [
          'From tabletop, press hips up to form an inverted V.',
          'Walk feet toward hands slightly if needed.',
          'Let your head hang completely — crown of head toward the floor.',
          'Hold and breathe. Feel the blood flowing to your scalp.',
          'After 1 minute, gently shake your head "yes" and "no" to increase circulation.',
          'Stay for 3–5 minutes total.',
          'Come down to Child\'s Pose and rest.',
        ],
        breathingCue: 'Deep, slow breathing. Feel each inhale sending blood to your scalp.',
        modification: 'Hold for shorter durations and build up gradually.',
        avoid: 'High blood pressure, glaucoma, or recent head injury.',
        imageKeyword: 'downward dog yoga scalp blood flow hair',
      },
      {
        id: 'balayam',
        name: 'Nail Rubbing Exercise',
        sanskritName: 'Balayam Yoga',
        duration: '5–10 minutes, twice daily',
        difficulty: 'beginner',
        benefits: 'Nerve endings at the base of the fingernails are directly connected to the scalp. Rubbing stimulates these nerves, increasing blood circulation to hair follicles. Traditional Indian remedy used for centuries.',
        steps: [
          'Sit comfortably or stand.',
          'Curl the fingers of both hands inward toward your palms.',
          'Bring your fingernails together so they are touching and facing each other.',
          'Rub the fingernails of both hands against each other vigorously.',
          'Use a back-and-forth scrubbing motion.',
          'The thumbs are excluded — thumb nails stimulate facial hair growth.',
          'Rub for 5 continuous minutes. You can do this while watching TV or commuting.',
          'Practice twice daily — morning and evening.',
          'Results appear in 3–6 months of consistent daily practice.',
        ],
        breathingCue: 'Normal, relaxed breathing. This is a gentle practice.',
        modification: 'No modification needed. This is accessible to everyone.',
        avoid: 'Pregnant women should avoid — the thumb nails specifically. Keep thumbs away.',
        imageKeyword: 'balayam nail rubbing yoga hair growth',
      },
    ],
    breathwork: [
      {
        name: 'Kapalabhati + Anulom Vilom Combined',
        duration: '15 minutes total',
        steps: [
          'Start with 5 minutes of Kapalabhati: sharp forceful exhales through nose, passive inhales. 60 pumps per minute.',
          'Rest for 1 minute with normal breathing.',
          'Continue with 9 minutes of Anulom Vilom (Alternate Nostril Breathing): inhale left 4 counts, hold 4, exhale right 8, inhale right 4, hold 4, exhale left 8.',
          'End with 2 minutes of deep slow breathing.',
        ],
        benefit: 'Kapalabhati increases oxygen in the bloodstream. Anulom Vilom balances the nervous system and reduces the stress hormones that cause hair shedding (telogen effluvium). This combination addresses both circulation and stress-related causes.',
        avoid: 'Skip Kapalabhati during menstruation or pregnancy.',
      },
    ],
  },

}


// ─────────────────────────────────────────────
// HELPER FUNCTIONS
// ─────────────────────────────────────────────

// Get the full yoga plan for a condition
export const getYogaPlan = (conditionId) =>
  YOGA_PLANS[conditionId] || null

// Get just the poses for a condition
export const getYogaPoses = (conditionId) =>
  YOGA_PLANS[conditionId]?.poses || []

// Get breathwork for a condition
export const getBreathwork = (conditionId) =>
  YOGA_PLANS[conditionId]?.breathwork || []

// Check if a yoga plan exists
export const hasYogaPlan = (conditionId) =>
  conditionId in YOGA_PLANS

// Get a single pose by id within a condition
export const getPoseById = (conditionId, poseId) =>
  YOGA_PLANS[conditionId]?.poses.find(p => p.id === poseId) || null