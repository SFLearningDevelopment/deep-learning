/**
 * Deep Learning — Question Bank
 * Single source of truth for both inline section quizzes and the
 * final evaluation. The evaluation randomly samples 40 questions from
 * the full pool of 115 (23 sections x 5) for each attempt, per learner.
 *
 * Schema (identical to QS_QUESTION_BANK — uniform 4-option MCQ):
 *   window.DL_QUESTION_BANK = {
 *     m{N}: {
 *       s{M}: [
 *         { id, q, options:[a,b,c,d], correctIndex, explanation, difficulty }
 *       ]
 *     }
 *   }
 *
 * Difficulty: 'easy' | 'medium' | 'hard'
 * IDs are stable strings (dl-mN-sM-iX) so analytics can track per-question stats later.
 *
 * Question mix per section (delivered through CONTENT, not a type field, to
 * preserve the deployed bank schema): 3 conceptual MCQ + 1 True/False-as-MCQ
 * + 1 scenario MCQ. The scenario item targets the "what not to do" tab.
 *
 * Source acknowledgement: section topics follow the structure of
 * R. Szeliski, "Computer Vision: Algorithms and Applications" (2nd ed.), Ch. 5.
 * Explanations and scenarios are original instructional content.
 */
window.DL_QUESTION_BANK = {

  // ============ MODULE 1: Supervised Learning (20% weight) ============
  m1: {

    // ---- 5.1.1 Nearest neighbors ----
    s1: [
      {
        id: 'dl-m1-s1-i1',
        q: 'In a k-nearest-neighbors classifier, what does increasing the value of k generally do to the decision boundary?',
        options: [
          'Makes it more jagged and sensitive to individual training points',
          'Makes it smoother and less sensitive to noise, at the risk of blurring fine structure',
          'Has no effect on the boundary, only on training time',
          'Forces the boundary to become perfectly linear'
        ],
        correctIndex: 1,
        explanation: 'Larger k averages over more neighbors, smoothing the boundary and reducing variance, but very large k can wash out genuine local structure (higher bias).',
        difficulty: 'easy'
      },
      {
        id: 'dl-m1-s1-i2',
        q: 'Why is feature scaling (e.g. standardisation) usually important before applying k-NN?',
        options: [
          'k-NN cannot run on unscaled data and will throw an error',
          'Distance metrics let large-range features dominate the neighbor calculation, so unscaled features bias the result',
          'Scaling reduces the number of neighbors that must be stored',
          'It converts the classifier from lazy to eager learning'
        ],
        correctIndex: 1,
        explanation: 'k-NN relies on a distance metric. A feature measured in thousands will dominate one measured in fractions unless features are placed on a comparable scale.',
        difficulty: 'medium'
      },
      {
        id: 'dl-m1-s1-i3',
        q: 'k-NN is often called a "lazy learner". What does that mean?',
        options: [
          'It deliberately ignores some training points to save memory',
          'It does no explicit training step; it defers all computation to query time by storing the data',
          'It only works on small datasets',
          'It learns slowly and needs many epochs'
        ],
        correctIndex: 1,
        explanation: 'A lazy learner builds no model up front — it keeps the training set and computes distances when a query arrives, which makes prediction expensive at scale.',
        difficulty: 'easy'
      },
      {
        id: 'dl-m1-s1-i4',
        q: 'True or False: Because k-NN stores all training data, prediction cost stays constant regardless of dataset size.',
        options: [
          'True — lookups are always O(1)',
          'False — naive prediction cost grows with the number of stored points, since each query compares against the training set',
          'True — only memory grows, never compute',
          'False — prediction is constant but training is expensive'
        ],
        correctIndex: 1,
        explanation: 'Naive k-NN must compute distances to (potentially) every stored point per query, so prediction cost scales with dataset size. Spatial indexes like KD-trees mitigate but do not eliminate this.',
        difficulty: 'medium'
      },
      {
        id: 'dl-m1-s1-i5',
        q: 'A team deploys a k-NN classifier with k=1 on raw, unscaled sensor data and reports near-perfect accuracy on training data but poor results in production. Which "what not to do" mistake best explains this?',
        options: [
          'They used too many neighbors, oversmoothing the boundary',
          'They trusted training accuracy with k=1 (which memorises the data) and skipped feature scaling, so the model overfits and is distorted by feature ranges',
          'k-NN cannot be used for sensor data at all',
          'They should have used more training data only'
        ],
        correctIndex: 1,
        explanation: 'k=1 always classifies training points perfectly (each is its own neighbor), so training accuracy is meaningless. Combined with unscaled features, the model overfits and generalises poorly. Validate on held-out data and scale features.',
        difficulty: 'hard'
      }
    ],

    // ---- 5.1.2 Bayesian classification ----
    s2: [
      {
        id: 'dl-m1-s2-i1',
        q: 'In Bayes\' theorem applied to classification, what does the posterior P(class | features) represent?',
        options: [
          'The probability of the features before seeing any class',
          'The updated probability of a class after observing the features',
          'The fixed prior probability of each class',
          'The likelihood of the features regardless of class'
        ],
        correctIndex: 1,
        explanation: 'The posterior is the probability of the class given the observed evidence — the prior updated by the likelihood of the features under that class.',
        difficulty: 'easy'
      },
      {
        id: 'dl-m1-s2-i2',
        q: 'What core assumption makes a classifier "naive" Bayes?',
        options: [
          'That all classes are equally likely',
          'That features are conditionally independent given the class',
          'That the data is normally distributed',
          'That there are only two classes'
        ],
        correctIndex: 1,
        explanation: 'Naive Bayes assumes features are conditionally independent given the class. It is often "naive" (untrue) yet works surprisingly well in practice.',
        difficulty: 'easy'
      },
      {
        id: 'dl-m1-s2-i3',
        q: 'Why does the class prior matter when classes are heavily imbalanced?',
        options: [
          'It does not matter; only the likelihood counts',
          'A strong prior toward the majority class can dominate the posterior unless the likelihood evidence is strong enough to overcome it',
          'Priors are only used during training, never at prediction',
          'Imbalanced classes make priors equal to one'
        ],
        correctIndex: 1,
        explanation: 'The posterior is proportional to prior x likelihood. With imbalance, a large prior on the majority class biases predictions toward it unless feature evidence is strong.',
        difficulty: 'medium'
      },
      {
        id: 'dl-m1-s2-i4',
        q: 'True or False: A naive Bayes classifier can still be useful even when its feature-independence assumption is clearly violated.',
        options: [
          'False — violating the assumption always makes it useless',
          'True — it often produces good class rankings even when independence does not strictly hold, though probability estimates may be poorly calibrated',
          'True — but only for two-class problems',
          'False — it requires strict independence to produce any output'
        ],
        correctIndex: 1,
        explanation: 'Naive Bayes frequently classifies well despite violated independence, because correct ranking of the top class is easier than producing well-calibrated probabilities.',
        difficulty: 'medium'
      },
      {
        id: 'dl-m1-s2-i5',
        q: 'A spam filter using naive Bayes assigns zero probability to any email containing a word never seen in training, breaking the whole prediction. What "what not to do" error caused this, and the fix?',
        options: [
          'Too many features were used; remove rare words — no smoothing needed',
          'The model multiplied in a zero likelihood for the unseen word; failing to apply smoothing (e.g. Laplace/add-one) is the mistake',
          'Naive Bayes cannot handle text and should not be used',
          'The prior was set too low; raising it fixes zeros'
        ],
        correctIndex: 1,
        explanation: 'An unseen feature gets zero likelihood, and multiplying by zero zeroes the whole posterior. Smoothing (adding a small count to every term) prevents zero probabilities. Skipping smoothing is the classic anti-pattern.',
        difficulty: 'hard'
      }
    ],

    // ---- 5.1.3 Logistic regression ----
    s3: [
      {
        id: 'dl-m1-s3-i1',
        q: 'Despite its name, logistic regression is primarily used for what task?',
        options: [
          'Predicting continuous real-valued outputs',
          'Classification — estimating the probability of class membership',
          'Clustering unlabeled data',
          'Dimensionality reduction'
        ],
        correctIndex: 1,
        explanation: 'Logistic regression models the probability of a class via the logistic (sigmoid) function; it is a classification method despite "regression" in the name.',
        difficulty: 'easy'
      },
      {
        id: 'dl-m1-s3-i2',
        q: 'What is the role of the sigmoid (logistic) function in logistic regression?',
        options: [
          'It squashes the linear combination of inputs into a (0, 1) probability range',
          'It randomly initialises the weights',
          'It computes the distance between points',
          'It splits the data into clusters'
        ],
        correctIndex: 0,
        explanation: 'The sigmoid maps any real-valued linear score to the open interval (0, 1), interpretable as a probability.',
        difficulty: 'easy'
      },
      {
        id: 'dl-m1-s3-i3',
        q: 'Which loss function is standard for training logistic regression?',
        options: [
          'Mean squared error',
          'Cross-entropy (log loss)',
          'Hinge loss',
          'Mean absolute error'
        ],
        correctIndex: 1,
        explanation: 'Logistic regression is trained by minimising cross-entropy / log loss, which is convex for this model and penalises confident wrong predictions heavily.',
        difficulty: 'medium'
      },
      {
        id: 'dl-m1-s3-i4',
        q: 'True or False: Logistic regression can only separate classes that are linearly separable in the original feature space.',
        options: [
          'True — it can never model non-linear boundaries under any circumstances',
          'False — its boundary is linear in the feature space, but engineered or basis-expanded features let it capture non-linear relationships',
          'True — it requires perfectly separable data to converge',
          'False — it always finds non-linear boundaries automatically'
        ],
        correctIndex: 1,
        explanation: 'The decision boundary is linear in whatever feature space you give it. Adding polynomial or other engineered features lets a linear-in-features model express non-linear boundaries in the original inputs.',
        difficulty: 'medium'
      },
      {
        id: 'dl-m1-s3-i5',
        q: 'An analyst fits logistic regression on perfectly separable data without regularisation and the weights blow up to huge values, with unstable predictions. What is the "what not to do" lesson?',
        options: [
          'Logistic regression should never be used on clean data',
          'On perfectly separable data the unregularised likelihood pushes weights toward infinity; omitting regularisation (or not detecting separation) is the mistake',
          'They should have used a larger learning rate',
          'The sigmoid must be replaced with a step function'
        ],
        correctIndex: 1,
        explanation: 'Perfect separation makes the maximum-likelihood solution drive weights to infinity. Regularisation (L2/L1) keeps weights finite and predictions stable. Ignoring this is a known pitfall.',
        difficulty: 'hard'
      }
    ],

    // ---- 5.1.4 Support vector machines ----
    s4: [
      {
        id: 'dl-m1-s4-i1',
        q: 'What does a support vector machine try to maximise when finding its decision boundary?',
        options: [
          'The number of training points classified correctly only',
          'The margin — the distance between the separating hyperplane and the nearest points of each class',
          'The total number of support vectors',
          'The variance of the input features'
        ],
        correctIndex: 1,
        explanation: 'An SVM seeks the maximum-margin hyperplane: the boundary that is as far as possible from the closest points (support vectors) of each class.',
        difficulty: 'easy'
      },
      {
        id: 'dl-m1-s4-i2',
        q: 'What are "support vectors" in an SVM?',
        options: [
          'All points in the training set',
          'The training points closest to the boundary that determine the margin',
          'The weights of the model',
          'Points that are misclassified and discarded'
        ],
        correctIndex: 1,
        explanation: 'Support vectors are the critical points lying on or within the margin; they alone define the decision boundary — other points could be removed without changing it.',
        difficulty: 'easy'
      },
      {
        id: 'dl-m1-s4-i3',
        q: 'What does the "kernel trick" allow an SVM to do?',
        options: [
          'Train without any labeled data',
          'Compute inner products in a high-dimensional feature space implicitly, enabling non-linear boundaries without explicit mapping',
          'Reduce the number of support vectors to one',
          'Eliminate the need for a margin'
        ],
        correctIndex: 1,
        explanation: 'Kernels compute similarities as if the data were mapped to a higher-dimensional space, letting a linear SVM there correspond to a non-linear boundary in the original space — without computing the mapping explicitly.',
        difficulty: 'medium'
      },
      {
        id: 'dl-m1-s4-i4',
        q: 'True or False: A smaller value of the SVM regularisation parameter C allows more margin violations (a softer margin).',
        options: [
          'False — smaller C forces a hard margin with zero violations',
          'True — smaller C penalises violations less, producing a wider, softer margin that tolerates some misclassification',
          'True — but only for linear kernels',
          'False — C controls only the kernel width'
        ],
        correctIndex: 1,
        explanation: 'C trades off margin width against violations. Small C = weaker penalty on violations = softer, wider margin; large C = harder margin that fits training data more tightly.',
        difficulty: 'medium'
      },
      {
        id: 'dl-m1-s4-i5',
        q: 'A practitioner uses an RBF-kernel SVM with a very large C and tiny kernel width, gets perfect training accuracy, and ships it. Test accuracy is poor. What is the anti-pattern?',
        options: [
          'They used too few support vectors',
          'Large C plus a tiny RBF width creates an extremely flexible boundary that overfits; trusting perfect training accuracy without cross-validating hyperparameters is the mistake',
          'RBF kernels cannot generalise and should never be used',
          'They forgot to remove the support vectors before deployment'
        ],
        correctIndex: 1,
        explanation: 'A large C with a narrow RBF kernel lets the SVM wrap tightly around training points, overfitting. Hyperparameters (C, gamma) must be tuned by cross-validation, not by chasing training accuracy.',
        difficulty: 'hard'
      }
    ],

    // ---- 5.1.5 Decision trees and forests ----
    s5: [
      {
        id: 'dl-m1-s5-i1',
        q: 'How does a decision tree make a prediction for a new input?',
        options: [
          'By averaging all training labels',
          'By routing the input down branches via feature tests until it reaches a leaf node',
          'By computing distances to every training point',
          'By solving a linear equation'
        ],
        correctIndex: 1,
        explanation: 'A decision tree applies a sequence of feature-threshold tests, following branches to a leaf that holds the prediction.',
        difficulty: 'easy'
      },
      {
        id: 'dl-m1-s5-i2',
        q: 'What problem are deep, unpruned decision trees especially prone to?',
        options: [
          'Underfitting — they are too simple',
          'Overfitting — they can memorise training data with very specific splits',
          'They cannot handle categorical features',
          'They always produce linear boundaries'
        ],
        correctIndex: 1,
        explanation: 'A fully grown tree can carve the feature space finely enough to fit noise, overfitting. Pruning, depth limits, or minimum-leaf sizes counteract this.',
        difficulty: 'easy'
      },
      {
        id: 'dl-m1-s5-i3',
        q: 'How does a random forest reduce the overfitting of a single decision tree?',
        options: [
          'By growing one very deep tree more carefully',
          'By averaging many trees trained on bootstrapped samples with random feature subsets, reducing variance',
          'By converting trees into a single linear model',
          'By removing all but the most important feature'
        ],
        correctIndex: 1,
        explanation: 'Random forests build many decorrelated trees (bagging + random feature selection) and aggregate them; averaging reduces variance without greatly increasing bias.',
        difficulty: 'medium'
      },
      {
        id: 'dl-m1-s5-i4',
        q: 'True or False: In a random forest, each tree is trained on the full dataset using all features at every split.',
        options: [
          'True — that is what makes it a forest',
          'False — trees use bootstrapped samples and consider only a random subset of features at each split, which decorrelates them',
          'True — only the final averaging differs from a single tree',
          'False — all trees are identical but initialised differently'
        ],
        correctIndex: 1,
        explanation: 'Randomness is the point: bootstrap sampling of rows and random feature subsets at each split make the trees diverse, so their average generalises better.',
        difficulty: 'medium'
      },
      {
        id: 'dl-m1-s5-i5',
        q: 'A team grows a single decision tree to full depth, sees 100% training accuracy, and presents it as their final model without validation. What is the "what not to do" lesson?',
        options: [
          'They should have grown the tree even deeper',
          'A fully grown tree memorises training data, so 100% training accuracy signals overfitting; relying on it without held-out validation (or an ensemble like a forest) is the mistake',
          'Decision trees cannot reach 100% accuracy, so the result is fake',
          'They should have used fewer training examples'
        ],
        correctIndex: 1,
        explanation: 'Perfect training accuracy on a deep tree is a red flag for overfitting, not a success. Use pruning/depth limits, validate on held-out data, or move to a random forest.',
        difficulty: 'hard'
      }
    ]
  }

};
