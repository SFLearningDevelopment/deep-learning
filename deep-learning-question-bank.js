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
  },

  // ============ MODULE 2: Unsupervised Learning (20% weight) ============
  m2: {

    // ---- 5.2.1 Clustering ----
    s1: [
      {
        id: 'dl-m2-s1-i1',
        q: 'What fundamentally distinguishes clustering from classification?',
        options: [
          'Clustering uses labelled data; classification does not',
          'Clustering groups data without predefined labels; classification predicts known labels',
          'Clustering is always faster than classification',
          'Clustering can only handle two groups'
        ],
        correctIndex: 1,
        explanation: 'Clustering is unsupervised — it discovers structure in unlabelled data. Classification is supervised and predicts predefined categories.',
        difficulty: 'easy'
      },
      {
        id: 'dl-m2-s1-i2',
        q: 'Why is choosing the number of clusters often the hardest part of clustering?',
        options: [
          'The algorithm refuses to run without it',
          'There is usually no single ground-truth answer; the "right" number depends on the goal and the data structure',
          'More clusters are always better',
          'The number of clusters must equal the number of features'
        ],
        correctIndex: 1,
        explanation: 'Unlike supervised accuracy, there is rarely one correct cluster count. Heuristics (elbow, silhouette) and domain goals guide the choice.',
        difficulty: 'medium'
      },
      {
        id: 'dl-m2-s1-i3',
        q: 'How does hierarchical (agglomerative) clustering differ from a flat method like k-means?',
        options: [
          'It requires the number of clusters up front; k-means does not',
          'It builds a tree of nested clusters (a dendrogram), letting you choose the granularity afterward',
          'It can only cluster numeric data',
          'It always produces exactly two clusters'
        ],
        correctIndex: 1,
        explanation: 'Agglomerative clustering merges points bottom-up into a dendrogram, so the number of clusters can be decided after seeing the hierarchy, rather than fixed in advance.',
        difficulty: 'medium'
      },
      {
        id: 'dl-m2-s1-i4',
        q: 'True or False: Clustering results are objective and independent of the distance metric and feature scaling chosen.',
        options: [
          'True — clustering always finds the same groups regardless of preprocessing',
          'False — the metric and scaling strongly shape which points are considered similar, so they change the resulting clusters',
          'True — but only for hierarchical clustering',
          'False — only the number of clusters matters, not scaling'
        ],
        correctIndex: 1,
        explanation: 'Clustering is highly sensitive to the distance metric and feature scaling; both determine what "similar" means and therefore the clusters found.',
        difficulty: 'medium'
      },
      {
        id: 'dl-m2-s1-i5',
        q: 'A team clusters customers on unscaled features (annual revenue in millions, plus a 1–5 satisfaction score) and the clusters turn out to be purely revenue bands. What is the "what not to do" lesson?',
        options: [
          'They used the wrong number of clusters; adding more would fix it',
          'They skipped feature scaling, so the high-range revenue feature dominated the distance and satisfaction was effectively ignored',
          'Clustering cannot be used on customer data',
          'They should have labelled the data first'
        ],
        correctIndex: 1,
        explanation: 'Without scaling, the million-scale revenue feature swamps the 1–5 satisfaction score, so clusters reflect only revenue. Standardise features before clustering.',
        difficulty: 'hard'
      }
    ],

    // ---- 5.2.2 K-means and Gaussian mixture models ----
    s2: [
      {
        id: 'dl-m2-s2-i1',
        q: 'What does the k-means algorithm iterate between?',
        options: [
          'Splitting and merging clusters',
          'Assigning points to the nearest centroid, then recomputing each centroid as the mean of its points',
          'Adding and removing features',
          'Increasing and decreasing k automatically'
        ],
        correctIndex: 1,
        explanation: 'K-means alternates an assignment step (each point to its nearest centroid) and an update step (each centroid becomes the mean of its assigned points) until convergence.',
        difficulty: 'easy'
      },
      {
        id: 'dl-m2-s2-i2',
        q: 'How does a Gaussian mixture model (GMM) generalise k-means?',
        options: [
          'It removes the need to choose the number of components',
          'It models clusters as Gaussian distributions and assigns soft (probabilistic) memberships, allowing elliptical clusters of different sizes',
          'It only works on one-dimensional data',
          'It guarantees the global optimum'
        ],
        correctIndex: 1,
        explanation: 'A GMM represents each cluster as a Gaussian with its own covariance and gives each point a probability of belonging to each component — soft assignment and flexible shapes, unlike k-means\' hard, spherical assignment.',
        difficulty: 'medium'
      },
      {
        id: 'dl-m2-s2-i3',
        q: 'Why is k-means sensitive to centroid initialisation?',
        options: [
          'It is not; results are always identical',
          'It converges to a local optimum, so different starting centroids can yield different final clusterings',
          'Initialisation determines the number of features',
          'Bad initialisation makes it run forever'
        ],
        correctIndex: 1,
        explanation: 'K-means only guarantees a local optimum. Poor initialisation can trap it in a bad solution, which is why methods like k-means++ and multiple restarts are used.',
        difficulty: 'medium'
      },
      {
        id: 'dl-m2-s2-i4',
        q: 'True or False: K-means implicitly assumes clusters are roughly spherical and similar in size.',
        options: [
          'False — k-means handles any cluster shape equally well',
          'True — because it assigns by Euclidean distance to centroids, it is biased toward spherical, comparably sized clusters',
          'True — but only when k is even',
          'False — that assumption belongs to hierarchical clustering'
        ],
        correctIndex: 1,
        explanation: 'Using Euclidean distance to a centroid makes k-means favour spherical, similarly sized clusters; elongated or unequal clusters are poorly captured (a GMM with full covariance does better).',
        difficulty: 'medium'
      },
      {
        id: 'dl-m2-s2-i5',
        q: 'An analyst runs k-means once with a single random initialisation on data with elongated, unequal clusters, gets an odd result, and concludes "the data has no structure." What went wrong?',
        options: [
          'Nothing; k-means is definitive',
          'They relied on one initialisation (risking a bad local optimum) and used k-means where its spherical-cluster assumption is violated; multiple restarts or a GMM were needed',
          'They should have used fewer data points',
          'k-means cannot run on more than two features'
        ],
        correctIndex: 1,
        explanation: 'A single run can land in a poor local optimum, and k-means is the wrong tool for elongated/unequal clusters. Use k-means++ with multiple restarts, or a GMM, before declaring no structure.',
        difficulty: 'hard'
      }
    ],

    // ---- 5.2.3 Principal component analysis ----
    s3: [
      {
        id: 'dl-m2-s3-i1',
        q: 'What does principal component analysis (PCA) do?',
        options: [
          'Classifies data into labelled categories',
          'Finds new orthogonal axes (principal components) that capture the directions of greatest variance, enabling dimensionality reduction',
          'Clusters data into groups',
          'Removes all correlations by deleting features'
        ],
        correctIndex: 1,
        explanation: 'PCA finds orthogonal directions of maximum variance and projects data onto the top few, reducing dimensionality while retaining as much variance as possible.',
        difficulty: 'easy'
      },
      {
        id: 'dl-m2-s3-i2',
        q: 'What do the first principal components represent?',
        options: [
          'The directions of least variance in the data',
          'The directions along which the data varies most',
          'The class labels',
          'The noise in the data'
        ],
        correctIndex: 1,
        explanation: 'Principal components are ordered by variance explained; the first captures the most variance, the second the most of what remains (orthogonal to the first), and so on.',
        difficulty: 'easy'
      },
      {
        id: 'dl-m2-s3-i3',
        q: 'Why should features usually be standardised before PCA?',
        options: [
          'PCA cannot run on raw data',
          'PCA is variance-based, so an unscaled large-variance feature would dominate the components regardless of its true importance',
          'Standardising increases the number of components',
          'It makes the components non-orthogonal'
        ],
        correctIndex: 1,
        explanation: 'Because PCA maximises variance, a feature with a large numeric range dominates unless features are standardised to comparable scales first.',
        difficulty: 'medium'
      },
      {
        id: 'dl-m2-s3-i4',
        q: 'True or False: PCA is a supervised method that uses class labels to find its components.',
        options: [
          'True — PCA requires labels to compute variance',
          'False — PCA is unsupervised; it uses only the feature variance/covariance structure, ignoring any labels',
          'True — but only for two classes',
          'False — PCA is actually a clustering method'
        ],
        correctIndex: 1,
        explanation: 'PCA is unsupervised: it works purely from the covariance structure of the features and does not use labels. (Label-aware projection is LDA, a different method.)',
        difficulty: 'medium'
      },
      {
        id: 'dl-m2-s3-i5',
        q: 'A team applies PCA, keeps just enough components to explain 95% of variance, then is surprised the projection no longer separates two classes well. What is the "what not to do" insight?',
        options: [
          'They kept too few components; keeping all of them is always correct',
          'PCA maximises variance, not class separation — directions of high variance need not align with class discrimination, so PCA can discard the very signal that separated the classes',
          'PCA always destroys class structure and should never precede classification',
          'They should have standardised after PCA instead of before'
        ],
        correctIndex: 1,
        explanation: 'High-variance directions are not necessarily discriminative. PCA can drop a low-variance but class-separating direction. When separation matters, consider supervised reduction (e.g. LDA) or validate downstream.',
        difficulty: 'hard'
      }
    ],

    // ---- 5.2.4 Manifold learning ----
    s4: [
      {
        id: 'dl-m2-s4-i1',
        q: 'What assumption underlies manifold learning?',
        options: [
          'That data fills its high-dimensional space uniformly',
          'That high-dimensional data often lies on or near a lower-dimensional manifold embedded in that space',
          'That all data is linearly separable',
          'That features are independent'
        ],
        correctIndex: 1,
        explanation: 'Manifold learning assumes the data, though high-dimensional, actually lies near a lower-dimensional curved surface (manifold), which non-linear methods try to "unfold".',
        difficulty: 'easy'
      },
      {
        id: 'dl-m2-s4-i2',
        q: 'How does manifold learning (e.g. t-SNE, Isomap) differ from PCA?',
        options: [
          'It is linear; PCA is non-linear',
          'It can capture non-linear structure, whereas PCA only finds linear projections',
          'It always preserves global distances exactly',
          'It requires labelled data'
        ],
        correctIndex: 1,
        explanation: 'PCA is a linear projection; manifold methods model non-linear structure, capturing curved relationships PCA cannot represent.',
        difficulty: 'medium'
      },
      {
        id: 'dl-m2-s4-i3',
        q: 'What is a key cautionary property of t-SNE visualisations?',
        options: [
          'They preserve global distances perfectly',
          'They emphasise local neighbourhood structure, so cluster sizes and between-cluster distances in the plot can be misleading',
          'They are fully deterministic across runs',
          'They require the data to be linearly separable'
        ],
        correctIndex: 1,
        explanation: 't-SNE focuses on preserving local neighbourhoods; the apparent size of clusters and the distances between them are not reliable, and results depend on parameters like perplexity.',
        difficulty: 'medium'
      },
      {
        id: 'dl-m2-s4-i4',
        q: 'True or False: Distances between well-separated clusters in a t-SNE plot can be interpreted as true measures of how different those clusters are.',
        options: [
          'True — t-SNE preserves global distances',
          'False — t-SNE does not preserve global geometry, so inter-cluster distances and relative sizes should not be read literally',
          'True — but only when perplexity is high',
          'False — t-SNE cannot produce separated clusters at all'
        ],
        correctIndex: 1,
        explanation: 't-SNE optimises local structure, not global distances; the gaps and sizes you see are artefacts of the embedding, not faithful measures of dissimilarity.',
        difficulty: 'medium'
      },
      {
        id: 'dl-m2-s4-i5',
        q: 'A data scientist runs t-SNE once, sees two clusters far apart, and reports to stakeholders that these groups are "extremely different — far more than the others." What is the anti-pattern?',
        options: [
          'Running t-SNE at all; PCA is always better',
          'Over-interpreting t-SNE geometry: inter-cluster distance is not meaningful, and a single run with one perplexity setting is not robust evidence',
          'Using too few iterations only',
          'Reporting clusters instead of raw points'
        ],
        correctIndex: 1,
        explanation: 'Reading literal meaning into t-SNE distances is a classic mistake. The separation is not a quantitative measure of difference, and conclusions should not rest on one parameter setting or run.',
        difficulty: 'hard'
      }
    ],

    // ---- 5.2.5 Semi-supervised learning ----
    s5: [
      {
        id: 'dl-m2-s5-i1',
        q: 'What characterises semi-supervised learning?',
        options: [
          'It uses only labelled data',
          'It combines a small amount of labelled data with a large amount of unlabelled data during training',
          'It uses no data at all',
          'It only works for clustering'
        ],
        correctIndex: 1,
        explanation: 'Semi-supervised learning leverages plentiful unlabelled data alongside scarce labelled data, aiming to improve over using the labelled data alone.',
        difficulty: 'easy'
      },
      {
        id: 'dl-m2-s5-i2',
        q: 'Why is semi-supervised learning attractive in many real-world settings?',
        options: [
          'Labels are free and abundant',
          'Unlabelled data is often cheap and plentiful while labelling is expensive, so using unlabelled data can boost performance cost-effectively',
          'It removes the need for any labels ever',
          'It always outperforms supervised learning'
        ],
        correctIndex: 1,
        explanation: 'Labelling is often the costly bottleneck. Semi-supervised methods exploit abundant unlabelled data to improve models when labels are scarce.',
        difficulty: 'easy'
      },
      {
        id: 'dl-m2-s5-i3',
        q: 'What core assumption do many semi-supervised methods rely on?',
        options: [
          'That labelled and unlabelled data come from unrelated distributions',
          'That nearby points (or points on the same data structure) tend to share the same label — the cluster/manifold assumption',
          'That all data is labelled eventually',
          'That unlabelled data is noise to be discarded'
        ],
        correctIndex: 1,
        explanation: 'Methods assume smoothness/cluster structure: points close together or in the same cluster likely share a label, letting unlabelled data shape decision boundaries.',
        difficulty: 'medium'
      },
      {
        id: 'dl-m2-s5-i4',
        q: 'True or False: Adding unlabelled data through self-training can never hurt model performance.',
        options: [
          'True — more data always helps',
          'False — if the model assigns confident but wrong pseudo-labels, self-training can reinforce its own errors and degrade performance',
          'True — but only with deep networks',
          'False — unlabelled data is always ignored anyway'
        ],
        correctIndex: 1,
        explanation: 'Self-training can amplify mistakes: confidently mislabelled unlabelled points feed back as if true, reinforcing errors. Unlabelled data helps only when assumptions hold and pseudo-labels are reliable.',
        difficulty: 'medium'
      },
      {
        id: 'dl-m2-s5-i5',
        q: 'A team self-trains a classifier: it pseudo-labels unlabelled data, retrains on everything, and repeats — accepting all pseudo-labels regardless of confidence. Accuracy drifts down over rounds. What is the "what not to do" lesson?',
        options: [
          'Semi-supervised learning never works; use only labelled data',
          'They fed back low-confidence and wrong pseudo-labels without a confidence threshold or validation, so the model reinforced its own errors (confirmation bias)',
          'They needed more rounds of self-training',
          'They should have discarded the labelled data'
        ],
        correctIndex: 1,
        explanation: 'Unfiltered pseudo-labelling lets errors compound. Use confidence thresholds, keep a clean validation set, and stop when validation performance drops, rather than trusting every pseudo-label.',
        difficulty: 'hard'
      }
    ]
  }

};
