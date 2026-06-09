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
  },

  // ============ MODULE 3: Deep Neural Networks (24% weight) ============
  m3: {

    // ---- 5.3.1 Weights and layers ----
    s1: [
      {
        id: 'dl-m3-s1-i1',
        q: 'In a fully connected neural network layer, what does each weight represent?',
        options: [
          'The number of neurons in the layer',
          'The strength of the connection between one input and one neuron',
          'The learning rate for that layer',
          'The activation function applied to the output'
        ],
        correctIndex: 1,
        explanation: 'Each weight scales the contribution of a specific input to a specific neuron; the network learns these connection strengths during training.',
        difficulty: 'easy'
      },
      {
        id: 'dl-m3-s1-i2',
        q: 'What is the role of the bias term in a neuron?',
        options: [
          'It sets the learning rate',
          'It shifts the activation threshold, letting the neuron fire even when all inputs are zero',
          'It normalises the inputs',
          'It counts the number of layers'
        ],
        correctIndex: 1,
        explanation: 'The bias is an additive term that shifts the weighted sum, allowing the neuron to activate independently of the input being zero — increasing the model\'s flexibility.',
        difficulty: 'easy'
      },
      {
        id: 'dl-m3-s1-i3',
        q: 'Why does stacking more layers (depth) help a network represent complex functions?',
        options: [
          'It reduces the number of parameters needed',
          'Each layer composes features from the previous one, building hierarchical representations from simple to complex',
          'Depth guarantees faster training',
          'It removes the need for activation functions'
        ],
        correctIndex: 1,
        explanation: 'Deeper layers compose lower-level features into higher-level ones (e.g. edges to shapes to objects), letting the network represent complex hierarchical patterns efficiently.',
        difficulty: 'medium'
      },
      {
        id: 'dl-m3-s1-i4',
        q: 'True or False: A deep network built entirely from linear layers with no non-linear activations can represent more complex functions than a single linear layer.',
        options: [
          'True — more layers always add representational power',
          'False — composing linear layers yields just another linear function, so without non-linearities depth adds nothing',
          'True — but only if the layers are very wide',
          'False — linear layers cannot be stacked at all'
        ],
        correctIndex: 1,
        explanation: 'A composition of linear transformations is itself linear. Without non-linear activations between layers, a deep linear network collapses to a single equivalent linear layer.',
        difficulty: 'medium'
      },
      {
        id: 'dl-m3-s1-i5',
        q: 'A practitioner initialises every weight in a network to the same constant value and finds all neurons in a layer learn identical features. What is the "what not to do" lesson?',
        options: [
          'Constant initialisation is fine; the issue is the learning rate',
          'Identical weights create symmetric neurons that receive identical gradients and never differentiate — weights must be initialised randomly to break symmetry',
          'They should have used more layers',
          'Bias terms should also be constant to fix it'
        ],
        correctIndex: 1,
        explanation: 'If neurons in a layer start identical, they get identical gradients and stay identical forever. Random initialisation breaks this symmetry so neurons can learn different features.',
        difficulty: 'hard'
      }
    ],

    // ---- 5.3.2 Activation functions ----
    s2: [
      {
        id: 'dl-m3-s2-i1',
        q: 'What is the primary purpose of a non-linear activation function?',
        options: [
          'To speed up matrix multiplication',
          'To introduce non-linearity so the network can model complex, non-linear relationships',
          'To reduce the number of weights',
          'To normalise the input data'
        ],
        correctIndex: 1,
        explanation: 'Non-linear activations let stacked layers represent non-linear functions; without them, depth provides no extra representational power.',
        difficulty: 'easy'
      },
      {
        id: 'dl-m3-s2-i2',
        q: 'What is a key advantage of ReLU over the sigmoid activation in deep networks?',
        options: [
          'ReLU always outputs values between 0 and 1',
          'ReLU does not saturate for positive inputs, mitigating vanishing gradients and training faster',
          'ReLU is smooth and differentiable everywhere',
          'ReLU guarantees no dead neurons'
        ],
        correctIndex: 1,
        explanation: 'ReLU passes positive values unchanged, so its gradient does not shrink toward zero for large positive inputs, helping gradients flow in deep networks — unlike sigmoid, which saturates.',
        difficulty: 'medium'
      },
      {
        id: 'dl-m3-s2-i3',
        q: 'What is the "dying ReLU" problem?',
        options: [
          'ReLU outputs grow without bound and overflow',
          'Neurons that always output zero (because their input stays negative) stop receiving gradient and never recover',
          'ReLU makes the network too slow',
          'ReLU only works in the final layer'
        ],
        correctIndex: 1,
        explanation: 'If a ReLU neuron\'s pre-activation stays negative, it outputs zero and its gradient is zero, so it never updates — it is effectively dead. Variants like Leaky ReLU address this.',
        difficulty: 'medium'
      },
      {
        id: 'dl-m3-s2-i4',
        q: 'True or False: The sigmoid activation is prone to vanishing gradients in deep networks because its derivative is small when inputs are large in magnitude.',
        options: [
          'False — sigmoid gradients are constant',
          'True — sigmoid saturates for large positive or negative inputs, where its derivative approaches zero, shrinking gradients through deep layers',
          'True — but only in the output layer',
          'False — sigmoid never saturates'
        ],
        correctIndex: 1,
        explanation: 'Sigmoid flattens for large-magnitude inputs, so its derivative nears zero there. Multiplying many such small derivatives through deep layers makes gradients vanish.',
        difficulty: 'medium'
      },
      {
        id: 'dl-m3-s2-i5',
        q: 'A team builds a 20-layer network using sigmoid activations throughout, and training stalls because early-layer gradients are nearly zero. What is the anti-pattern and fix?',
        options: [
          'The network is too small; add more sigmoid layers',
          'Using saturating activations (sigmoid) throughout a deep network causes vanishing gradients; switching to non-saturating activations like ReLU (and good initialisation) is the fix',
          'They should remove all activation functions',
          'Sigmoid is fine; the learning rate just needs to be zero'
        ],
        correctIndex: 1,
        explanation: 'Sigmoids saturate and their small derivatives multiply to near-zero gradients in deep stacks. ReLU-family activations plus proper initialisation (and normalisation) keep gradients flowing.',
        difficulty: 'hard'
      }
    ],

    // ---- 5.3.3 Regularization and normalization ----
    s3: [
      {
        id: 'dl-m3-s3-i1',
        q: 'What problem does regularisation primarily address?',
        options: [
          'Slow matrix multiplication',
          'Overfitting — it discourages the model from fitting noise in the training data',
          'Vanishing gradients',
          'Insufficient training data'
        ],
        correctIndex: 1,
        explanation: 'Regularisation techniques constrain model complexity so it generalises better, reducing overfitting to training-set noise.',
        difficulty: 'easy'
      },
      {
        id: 'dl-m3-s3-i2',
        q: 'How does dropout regularise a neural network?',
        options: [
          'It deletes layers permanently after training',
          'It randomly deactivates a fraction of neurons during each training step, preventing co-adaptation and forcing redundancy',
          'It reduces the learning rate over time',
          'It removes the bias terms'
        ],
        correctIndex: 1,
        explanation: 'Dropout randomly zeroes a fraction of activations each training step, so neurons cannot rely on specific others — encouraging robust, redundant features that generalise better.',
        difficulty: 'medium'
      },
      {
        id: 'dl-m3-s3-i3',
        q: 'What does batch normalisation do?',
        options: [
          'It removes outliers from the dataset',
          'It normalises layer inputs using batch statistics, stabilising and speeding up training',
          'It increases the batch size automatically',
          'It replaces the activation function'
        ],
        correctIndex: 1,
        explanation: 'Batch normalisation standardises a layer\'s inputs using the current mini-batch\'s mean and variance, reducing internal covariate shift and allowing higher learning rates and faster, more stable training.',
        difficulty: 'medium'
      },
      {
        id: 'dl-m3-s3-i4',
        q: 'True or False: Dropout should be active during inference (test time) just as it is during training.',
        options: [
          'True — dropout must always be on for consistency',
          'False — dropout is disabled at inference; the full network is used (with appropriate scaling) so predictions are deterministic',
          'True — but only for the output layer',
          'False — dropout is only ever used at inference'
        ],
        correctIndex: 1,
        explanation: 'Dropout is a training-time technique. At inference it is turned off and activations are scaled appropriately so the full network produces stable, deterministic predictions.',
        difficulty: 'medium'
      },
      {
        id: 'dl-m3-s3-i5',
        q: 'A team adds heavy dropout and strong L2 regularisation to a model that was already underfitting, and performance gets worse on both training and validation sets. What is the "what not to do" lesson?',
        options: [
          'Regularisation always helps; they need even more',
          'Piling on regularisation when the model is underfitting (high bias) further restricts an already-too-simple model — regularisation fixes overfitting, not underfitting',
          'They should remove the validation set',
          'Dropout and L2 can never be used together'
        ],
        correctIndex: 1,
        explanation: 'Regularisation combats overfitting. Applying it to an underfitting model increases bias and hurts both training and validation performance. Diagnose bias vs variance before regularising.',
        difficulty: 'hard'
      }
    ],

    // ---- 5.3.4 Loss functions ----
    s4: [
      {
        id: 'dl-m3-s4-i1',
        q: 'What does a loss function measure?',
        options: [
          'The number of layers in the network',
          'How far the model\'s predictions are from the true targets, giving a signal to minimise',
          'The speed of training',
          'The amount of memory used'
        ],
        correctIndex: 1,
        explanation: 'The loss quantifies prediction error; training minimises it, so the choice of loss defines what "good" means for the model.',
        difficulty: 'easy'
      },
      {
        id: 'dl-m3-s4-i2',
        q: 'Which loss is standard for multi-class classification with a softmax output?',
        options: [
          'Mean squared error',
          'Cross-entropy loss',
          'Hinge loss',
          'Mean absolute error'
        ],
        correctIndex: 1,
        explanation: 'Cross-entropy paired with softmax is the standard for multi-class classification; it strongly penalises confident wrong predictions and has well-behaved gradients.',
        difficulty: 'easy'
      },
      {
        id: 'dl-m3-s4-i3',
        q: 'Why is mean squared error usually a poor choice for classification?',
        options: [
          'It is too fast to compute',
          'It does not align with class probabilities and yields weaker gradients for confident misclassifications, slowing learning compared to cross-entropy',
          'It can only be used for two classes',
          'It requires labelled data, unlike cross-entropy'
        ],
        correctIndex: 1,
        explanation: 'MSE treats classification like regression on probabilities; combined with sigmoid/softmax it produces small gradients when the model is confidently wrong, so cross-entropy learns faster and more reliably.',
        difficulty: 'medium'
      },
      {
        id: 'dl-m3-s4-i4',
        q: 'True or False: The choice of loss function should reflect the task and the cost of different kinds of errors.',
        options: [
          'False — any loss works equally well for any task',
          'True — the loss encodes what the model optimises, so it must match the task and the relative cost of error types',
          'True — but only for regression tasks',
          'False — the loss only affects training speed, not behaviour'
        ],
        correctIndex: 1,
        explanation: 'The loss defines the optimisation target. Matching it to the task (and weighting costly error types) directly shapes what the trained model prioritises.',
        difficulty: 'medium'
      },
      {
        id: 'dl-m3-s4-i5',
        q: 'On a heavily imbalanced fraud-detection task (1% fraud), a team trains with plain accuracy-driven loss; the model predicts "not fraud" for everything and reports 99% accuracy. What is the anti-pattern?',
        options: [
          'The model is correct; 99% accuracy is excellent',
          'Optimising an unweighted loss/metric on imbalanced data lets the majority class dominate; the loss must reflect error costs (e.g. class weighting) and evaluation must use metrics like recall/precision',
          'They should have used more layers',
          'Accuracy is always the right metric'
        ],
        correctIndex: 1,
        explanation: 'On extreme imbalance, predicting the majority class yields high accuracy but zero fraud detection. Use class-weighted/focal loss and evaluate with precision/recall, not raw accuracy.',
        difficulty: 'hard'
      }
    ],

    // ---- 5.3.5 Backpropagation ----
    s5: [
      {
        id: 'dl-m3-s5-i1',
        q: 'What does backpropagation compute?',
        options: [
          'The forward predictions of the network',
          'The gradient of the loss with respect to every weight, by applying the chain rule backward through the network',
          'The number of neurons to add',
          'The optimal learning rate'
        ],
        correctIndex: 1,
        explanation: 'Backpropagation efficiently computes the loss gradient for each weight using the chain rule, propagating error signals from the output back through the layers.',
        difficulty: 'easy'
      },
      {
        id: 'dl-m3-s5-i2',
        q: 'Backpropagation relies on which calculus principle?',
        options: [
          'The fundamental theorem of integration',
          'The chain rule for derivatives of composed functions',
          'Integration by parts',
          'L\'Hôpital\'s rule'
        ],
        correctIndex: 1,
        explanation: 'A neural network is a composition of functions; the chain rule lets backprop combine local derivatives layer by layer into the full gradient.',
        difficulty: 'easy'
      },
      {
        id: 'dl-m3-s5-i3',
        q: 'Why must a forward pass be completed (and intermediate values stored) before the backward pass?',
        options: [
          'To free up memory',
          'The backward pass reuses activations computed in the forward pass to evaluate local gradients via the chain rule',
          'Because weights change during the forward pass',
          'To select the loss function'
        ],
        correctIndex: 1,
        explanation: 'Gradients depend on the activations produced in the forward pass, so those intermediate values are cached and reused when propagating gradients backward.',
        difficulty: 'medium'
      },
      {
        id: 'dl-m3-s5-i4',
        q: 'True or False: Vanishing and exploding gradients are problems that arise during backpropagation through many layers.',
        options: [
          'False — gradients are always stable regardless of depth',
          'True — repeatedly multiplying gradients through many layers can shrink them toward zero (vanishing) or blow them up (exploding)',
          'True — but only in the forward pass',
          'False — these only occur with missing data'
        ],
        correctIndex: 1,
        explanation: 'Backprop multiplies many local gradients; if these are consistently small or large, the product vanishes or explodes through deep networks — addressed by normalisation, good init, gradient clipping, and residual connections.',
        difficulty: 'medium'
      },
      {
        id: 'dl-m3-s5-i5',
        q: 'A team trains a deep RNN, sees the loss become NaN after a few steps, and concludes the framework is broken. What is the "what not to do" lesson?',
        options: [
          'The framework is indeed broken; switch tools',
          'NaN losses commonly signal exploding gradients; rather than blaming the tools, apply gradient clipping, lower the learning rate, or improve initialisation',
          'They should train for more steps and it will recover',
          'NaN is normal and can be ignored'
        ],
        correctIndex: 1,
        explanation: 'Exploding gradients in deep/recurrent nets drive weights and loss to NaN. The fix is gradient clipping, a smaller learning rate, and better initialisation — not assuming the library is faulty.',
        difficulty: 'hard'
      }
    ],

    // ---- 5.3.6 Training and optimization ----
    s6: [
      {
        id: 'dl-m3-s6-i1',
        q: 'What does an optimiser like stochastic gradient descent (SGD) do with the gradients from backpropagation?',
        options: [
          'It computes the loss function',
          'It updates the weights by stepping them in the direction that reduces the loss, scaled by the learning rate',
          'It selects the activation function',
          'It increases the number of layers'
        ],
        correctIndex: 1,
        explanation: 'The optimiser uses gradients to update weights, moving them opposite the gradient (downhill on the loss) by an amount governed by the learning rate.',
        difficulty: 'easy'
      },
      {
        id: 'dl-m3-s6-i2',
        q: 'What is the effect of a learning rate that is far too high?',
        options: [
          'Training converges very slowly but smoothly',
          'Updates overshoot minima, causing the loss to oscillate or diverge rather than settle',
          'The model trains perfectly with no downside',
          'Gradients vanish'
        ],
        correctIndex: 1,
        explanation: 'Too-large steps overshoot the loss minimum, making training unstable — the loss bounces around or blows up instead of decreasing steadily.',
        difficulty: 'easy'
      },
      {
        id: 'dl-m3-s6-i3',
        q: 'What advantage does the Adam optimiser offer over plain SGD?',
        options: [
          'It removes the need for a loss function',
          'It adapts per-parameter learning rates using running estimates of gradient moments, often converging faster with less manual tuning',
          'It guarantees the global optimum',
          'It eliminates the need for gradients'
        ],
        correctIndex: 1,
        explanation: 'Adam maintains adaptive, per-parameter step sizes from running averages of the gradient and its square, typically giving faster, more robust convergence than vanilla SGD.',
        difficulty: 'medium'
      },
      {
        id: 'dl-m3-s6-i4',
        q: 'True or False: Monitoring only training loss is sufficient to know a model will generalise well.',
        options: [
          'True — training loss fully predicts generalisation',
          'False — a falling training loss with a rising validation loss signals overfitting, so validation performance must also be tracked',
          'True — but only when using Adam',
          'False — training loss is irrelevant to training'
        ],
        correctIndex: 1,
        explanation: 'Training loss alone hides overfitting. Watching validation loss reveals when the model stops generalising even as training loss keeps dropping — the basis for early stopping.',
        difficulty: 'medium'
      },
      {
        id: 'dl-m3-s6-i5',
        q: 'A team trains for a fixed 500 epochs because "more training is better," ignoring validation. Validation loss bottomed at epoch 80 and rose afterward; the final model is worse than the mid-training one. What is the anti-pattern?',
        options: [
          'They should have trained for 1000 epochs',
          'Training blindly for a fixed long schedule without monitoring validation overfits past the optimum; early stopping (or checkpointing the best validation model) is the fix',
          'Validation loss is irrelevant to model quality',
          'They should have removed the optimiser'
        ],
        correctIndex: 1,
        explanation: 'More epochs is not always better. Past the validation minimum the model overfits. Use early stopping or keep the checkpoint with the best validation loss rather than the last epoch.',
        difficulty: 'hard'
      }
    ]
  },

  // ============ MODULE 4: Convolutional Neural Networks (24% weight) ============
  m4: {

    // ---- 5.4.1 Pooling and unpooling ----
    s1: [
      {
        id: 'dl-m4-s1-i1',
        q: 'What is the main purpose of a pooling layer in a CNN?',
        options: [
          'To add learnable weights between convolutions',
          'To downsample feature maps, reducing spatial size and adding small translation invariance',
          'To increase the number of channels',
          'To apply the loss function'
        ],
        correctIndex: 1,
        explanation: 'Pooling (e.g. max pooling) reduces the spatial resolution of feature maps, cutting computation and giving the network tolerance to small shifts in the input.',
        difficulty: 'easy'
      },
      {
        id: 'dl-m4-s1-i2',
        q: 'How does max pooling differ from average pooling?',
        options: [
          'Max pooling sums all values; average pooling multiplies them',
          'Max pooling keeps the strongest activation in each window; average pooling takes the mean of the window',
          'Max pooling has learnable weights; average pooling does not',
          'They are identical in effect'
        ],
        correctIndex: 1,
        explanation: 'Max pooling outputs the maximum activation in each region (emphasising strong features); average pooling outputs the mean (smoothing the response).',
        difficulty: 'easy'
      },
      {
        id: 'dl-m4-s1-i3',
        q: 'In an encoder–decoder architecture, what role does unpooling (or upsampling) play?',
        options: [
          'It removes feature maps to save memory',
          'It increases spatial resolution to reconstruct larger outputs, reversing the downsampling done by pooling',
          'It applies dropout',
          'It computes the gradient'
        ],
        correctIndex: 1,
        explanation: 'Unpooling/upsampling restores spatial resolution in the decoder, enabling dense outputs such as segmentation maps from a downsampled representation.',
        difficulty: 'medium'
      },
      {
        id: 'dl-m4-s1-i4',
        q: 'True or False: Aggressive pooling that downsamples too quickly can discard fine spatial detail needed for the task.',
        options: [
          'False — pooling never loses useful information',
          'True — overly aggressive downsampling throws away spatial detail that tasks like segmentation or small-object detection depend on',
          'True — but only for average pooling',
          'False — pooling only affects channels, not spatial detail'
        ],
        correctIndex: 1,
        explanation: 'Pooling is lossy by design. Downsampling too fast destroys fine-grained spatial information, which hurts tasks that need precise localisation.',
        difficulty: 'medium'
      },
      {
        id: 'dl-m4-s1-i5',
        q: 'A team building a segmentation model pools aggressively in the encoder but uses crude upsampling with no skip connections, and the output masks are blurry and misaligned. What is the "what not to do" lesson?',
        options: [
          'Pooling should never be used in segmentation',
          'Aggressive downsampling discards spatial detail that crude upsampling cannot recover; skip connections (passing encoder detail to the decoder) are needed to preserve localisation',
          'They should have removed the decoder entirely',
          'Blurry masks are unavoidable in all CNNs'
        ],
        correctIndex: 1,
        explanation: 'Once fine detail is pooled away, naive upsampling cannot restore it. Architectures like U-Net add skip connections so high-resolution encoder features guide the decoder, sharpening outputs.',
        difficulty: 'hard'
      }
    ],

    // ---- 5.4.2 Application: Digit classification ----
    s2: [
      {
        id: 'dl-m4-s2-i1',
        q: 'Why are CNNs well suited to digit/image classification compared to fully connected networks?',
        options: [
          'They have no weights to train',
          'Convolutions exploit spatial locality and share weights, capturing patterns regardless of position with far fewer parameters',
          'They require no training data',
          'They cannot overfit'
        ],
        correctIndex: 1,
        explanation: 'Convolutional filters share weights across the image and respond to local patterns, giving translation-aware feature detection with dramatically fewer parameters than a dense network.',
        difficulty: 'easy'
      },
      {
        id: 'dl-m4-s2-i2',
        q: 'In a digit classifier, what does the final softmax layer produce?',
        options: [
          'A single binary output',
          'A probability distribution over the digit classes (0–9) that sums to one',
          'The raw pixel values',
          'The convolutional filters'
        ],
        correctIndex: 1,
        explanation: 'Softmax converts the final scores into a normalised probability distribution across the classes, from which the highest-probability digit is chosen.',
        difficulty: 'easy'
      },
      {
        id: 'dl-m4-s2-i3',
        q: 'Why is a held-out test set essential when reporting digit-classifier accuracy?',
        options: [
          'It speeds up training',
          'It estimates generalisation to unseen data; accuracy on training data alone can be inflated by memorisation',
          'It is required to compute the loss',
          'It increases the number of classes'
        ],
        correctIndex: 1,
        explanation: 'Only performance on data the model never trained on reflects real-world generalisation; training accuracy can be misleadingly high.',
        difficulty: 'medium'
      },
      {
        id: 'dl-m4-s2-i4',
        q: 'True or False: Data augmentation (small rotations, shifts, scaling) can improve a digit classifier\'s robustness to input variation.',
        options: [
          'False — augmentation always corrupts the labels',
          'True — label-preserving transformations expand effective training variety, helping the model generalise to natural variation',
          'True — but only if the dataset is already huge',
          'False — augmentation only slows training with no benefit'
        ],
        correctIndex: 1,
        explanation: 'Augmenting with realistic, label-preserving transforms exposes the model to more variation, improving robustness and reducing overfitting.',
        difficulty: 'medium'
      },
      {
        id: 'dl-m4-s2-i5',
        q: 'A team reports 99.8% accuracy on a digit model, but it fails in deployment. They had shuffled and split data such that augmented copies of the same images appeared in both train and test sets. What is the anti-pattern?',
        options: [
          'They used too much augmentation',
          'Data leakage: near-duplicate (augmented) images crossing the train/test boundary inflated test accuracy, so the reported number did not reflect true generalisation',
          'Digit classification cannot reach 99%',
          'They should have trained on the test set too'
        ],
        correctIndex: 1,
        explanation: 'Letting augmented versions of the same source image land in both splits leaks information; the test set is no longer truly unseen, inflating accuracy. Split by source image before augmenting.',
        difficulty: 'hard'
      }
    ],

    // ---- 5.4.3 Network architectures ----
    s3: [
      {
        id: 'dl-m4-s3-i1',
        q: 'What problem do residual connections (as in ResNet) primarily address?',
        options: [
          'They reduce the number of classes',
          'They ease training of very deep networks by letting gradients flow through skip (identity) paths, mitigating vanishing gradients',
          'They remove the need for convolutions',
          'They eliminate the loss function'
        ],
        correctIndex: 1,
        explanation: 'Residual/skip connections add the input back to a block\'s output, giving gradients a direct path and making very deep networks trainable.',
        difficulty: 'easy'
      },
      {
        id: 'dl-m4-s3-i2',
        q: 'What general trend distinguishes later CNN architectures from early ones like a basic LeNet?',
        options: [
          'They use fewer than three layers',
          'They tend to be deeper and use design innovations (e.g. residuals, batch norm, better blocks) to train effectively at depth',
          'They avoid convolutions entirely',
          'They never use pooling'
        ],
        correctIndex: 1,
        explanation: 'Architectural progress largely involved going deeper and adding mechanisms (residuals, normalisation, efficient blocks) that make deep CNNs trainable and accurate.',
        difficulty: 'medium'
      },
      {
        id: 'dl-m4-s3-i3',
        q: 'Why might a smaller, efficient architecture be preferred over a huge one in production?',
        options: [
          'Smaller models are always more accurate',
          'Latency, memory, and energy constraints often matter; an efficient model meeting accuracy needs can be the better engineering choice',
          'Large models cannot be deployed at all',
          'Smaller models never overfit'
        ],
        correctIndex: 1,
        explanation: 'Production has real constraints (speed, memory, cost). The best architecture is the one that meets accuracy requirements within those limits, not necessarily the largest.',
        difficulty: 'medium'
      },
      {
        id: 'dl-m4-s3-i4',
        q: 'True or False: Simply adding more layers to a plain (non-residual) CNN reliably improves accuracy without limit.',
        options: [
          'True — depth always helps',
          'False — beyond a point, plain deep networks can become harder to train and may degrade; innovations like residuals were needed to benefit from extreme depth',
          'True — but only past 1000 layers',
          'False — depth never matters'
        ],
        correctIndex: 1,
        explanation: 'Naively stacking layers in a plain network led to degradation (harder optimisation), which residual connections were introduced to overcome. Depth helps only with the right design.',
        difficulty: 'medium'
      },
      {
        id: 'dl-m4-s3-i5',
        q: 'A team picks the largest, highest-accuracy architecture from a leaderboard for a mobile app, ignoring its latency and memory footprint; it cannot run in real time on-device. What is the "what not to do" lesson?',
        options: [
          'Leaderboard accuracy is the only thing that matters',
          'Choosing an architecture solely by benchmark accuracy, ignoring deployment constraints (latency, memory, power), produces a model that is unusable in its target environment',
          'They should have used an even larger model',
          'Mobile apps cannot run CNNs'
        ],
        correctIndex: 1,
        explanation: 'Top-of-leaderboard accuracy is irrelevant if the model cannot meet on-device latency/memory budgets. Architecture choice must weigh deployment constraints, not just accuracy.',
        difficulty: 'hard'
      }
    ],

    // ---- 5.4.4 Model zoos ----
    s4: [
      {
        id: 'dl-m4-s4-i1',
        q: 'What is a "model zoo"?',
        options: [
          'A dataset of animal images',
          'A collection of pre-trained models that can be downloaded and reused',
          'A tool for drawing network diagrams',
          'A type of loss function'
        ],
        correctIndex: 1,
        explanation: 'A model zoo is a repository of pre-trained models (often with weights) that practitioners can reuse, fine-tune, or benchmark against.',
        difficulty: 'easy'
      },
      {
        id: 'dl-m4-s4-i2',
        q: 'What is transfer learning in the context of using a pre-trained model?',
        options: [
          'Training a model entirely from scratch',
          'Reusing a model pre-trained on a large dataset and adapting it (e.g. fine-tuning) to a new, often smaller, task',
          'Copying the test set into the training set',
          'Converting a model to another programming language'
        ],
        correctIndex: 1,
        explanation: 'Transfer learning leverages features learned on a large dataset, fine-tuning them for a related task — valuable when task-specific data is limited.',
        difficulty: 'easy'
      },
      {
        id: 'dl-m4-s4-i3',
        q: 'Why is transfer learning especially useful when you have limited labelled data?',
        options: [
          'It removes the need for any data',
          'The pre-trained features already capture general structure, so the model needs far less task-specific data to perform well',
          'It guarantees perfect accuracy',
          'It only works with unlabelled data'
        ],
        correctIndex: 1,
        explanation: 'A model pre-trained on a large corpus brings useful general-purpose features; adapting it needs much less labelled data than training from scratch.',
        difficulty: 'medium'
      },
      {
        id: 'dl-m4-s4-i4',
        q: 'True or False: When reusing a pre-trained model, you must apply the same input preprocessing (e.g. normalisation) that the model was trained with.',
        options: [
          'False — preprocessing never matters for pre-trained models',
          'True — feeding inputs preprocessed differently from training (wrong normalisation/size) can badly degrade a pre-trained model\'s performance',
          'True — but only for the final layer',
          'False — pre-trained models adapt to any input format automatically'
        ],
        correctIndex: 1,
        explanation: 'Pre-trained models expect inputs matching their training preprocessing (scaling, mean/std, resolution). Mismatched preprocessing silently degrades results.',
        difficulty: 'medium'
      },
      {
        id: 'dl-m4-s4-i5',
        q: 'A team downloads a pre-trained model and fine-tunes it on sensitive data, without checking its licence or training-data provenance, then ships it commercially. What is the anti-pattern?',
        options: [
          'Using pre-trained models is always prohibited',
          'Ignoring licence terms, provenance, and potential embedded biases of a zoo model creates legal and ethical risk; due diligence on licence and data origin is required before commercial use',
          'They should never fine-tune a model',
          'Provenance is irrelevant for deep learning'
        ],
        correctIndex: 1,
        explanation: 'Model-zoo weights carry licences, data-provenance questions, and inherited biases. Reusing them commercially without checking these creates legal/ethical exposure — verify before shipping.',
        difficulty: 'hard'
      }
    ],

    // ---- 5.4.5 Visualizing weights and activations ----
    s5: [
      {
        id: 'dl-m4-s5-i1',
        q: 'Why do practitioners visualise the filters and activations of a CNN?',
        options: [
          'To make the model train faster',
          'To gain insight into what features the network has learned and to help debug or interpret its behaviour',
          'To reduce the number of parameters',
          'To replace the loss function'
        ],
        correctIndex: 1,
        explanation: 'Visualising learned filters and activation maps helps practitioners understand and debug what the network is responding to, aiding interpretation.',
        difficulty: 'easy'
      },
      {
        id: 'dl-m4-s5-i2',
        q: 'What do early convolutional layers typically learn to detect?',
        options: [
          'Whole objects and faces',
          'Low-level features such as edges, colours, and simple textures',
          'The final class probabilities',
          'The loss value'
        ],
        correctIndex: 1,
        explanation: 'Early layers respond to simple, local patterns (edges, colours, textures); deeper layers compose these into increasingly complex, abstract features.',
        difficulty: 'easy'
      },
      {
        id: 'dl-m4-s5-i3',
        q: 'What can a saliency or class-activation map reveal?',
        options: [
          'The exact training time',
          'Which regions of an input most influenced the model\'s prediction',
          'The number of layers in the network',
          'The optimiser used'
        ],
        correctIndex: 1,
        explanation: 'Saliency/CAM-style methods highlight the input regions that most affected a prediction, helping verify the model attends to sensible evidence.',
        difficulty: 'medium'
      },
      {
        id: 'dl-m4-s5-i4',
        q: 'True or False: A model can achieve high accuracy yet rely on spurious cues, which visualisation can help expose.',
        options: [
          'False — high accuracy guarantees correct reasoning',
          'True — a model may exploit background or artefact cues; activation/saliency visualisation can reveal it is "right for the wrong reasons"',
          'True — but only for regression models',
          'False — visualisation cannot show anything useful'
        ],
        correctIndex: 1,
        explanation: 'High accuracy can mask reliance on spurious correlations (e.g. background, watermarks). Visualisation can expose that the model attends to the wrong evidence.',
        difficulty: 'medium'
      },
      {
        id: 'dl-m4-s5-i5',
        q: 'A high-accuracy animal classifier is deployed; later, saliency maps show it keys on grassy backgrounds, not the animals. The team had never visualised activations before shipping. What is the "what not to do" lesson?',
        options: [
          'Visualisation is a waste of time if accuracy is high',
          'Trusting headline accuracy without inspecting what the model attends to can hide reliance on spurious cues that break under distribution shift; interpretability checks belong before deployment',
          'They should have used a larger test set only',
          'Saliency maps are always misleading'
        ],
        correctIndex: 1,
        explanation: 'A model right for the wrong reasons fails when the spurious cue disappears. Visualising activations/saliency before deployment surfaces such shortcuts that accuracy alone hides.',
        difficulty: 'hard'
      }
    ],

    // ---- 5.4.6 Adversarial examples ----
    s6: [
      {
        id: 'dl-m4-s6-i1',
        q: 'What is an adversarial example?',
        options: [
          'A mislabelled training image',
          'An input with a small, often imperceptible perturbation crafted to make the model misclassify it',
          'A duplicate image in the dataset',
          'A very large input image'
        ],
        correctIndex: 1,
        explanation: 'Adversarial examples add tiny, deliberately chosen perturbations — often invisible to humans — that cause confident misclassification.',
        difficulty: 'easy'
      },
      {
        id: 'dl-m4-s6-i2',
        q: 'Why are adversarial examples concerning for deployed models?',
        options: [
          'They make training faster',
          'They reveal that models can be fooled by inputs humans see as unchanged, posing security and safety risks',
          'They only affect training accuracy',
          'They have no practical impact'
        ],
        correctIndex: 1,
        explanation: 'If an attacker can craft inputs that look normal but fool the model, that is a real security/safety risk for systems relying on the model\'s predictions.',
        difficulty: 'easy'
      },
      {
        id: 'dl-m4-s6-i3',
        q: 'What is adversarial training?',
        options: [
          'Training two humans to compete',
          'Augmenting training with adversarial examples so the model learns to resist such perturbations',
          'Training without any labels',
          'Removing the adversarial examples from the dataset'
        ],
        correctIndex: 1,
        explanation: 'Adversarial training includes adversarially perturbed inputs during training, improving robustness to such attacks (often at some cost to clean accuracy).',
        difficulty: 'medium'
      },
      {
        id: 'dl-m4-s6-i4',
        q: 'True or False: High accuracy on a clean test set guarantees a model is robust to adversarial perturbations.',
        options: [
          'True — clean accuracy implies robustness',
          'False — a model can be highly accurate on clean data yet extremely fragile to small adversarial perturbations',
          'True — but only for CNNs',
          'False — clean accuracy and robustness are the same thing'
        ],
        correctIndex: 1,
        explanation: 'Clean accuracy and adversarial robustness are distinct; strong clean performance says nothing about resistance to crafted perturbations.',
        difficulty: 'medium'
      },
      {
        id: 'dl-m4-s6-i5',
        q: 'A team deploys a CNN for a security-sensitive access system, validating only on clean accuracy and never testing adversarial robustness. Attackers later fool it with perturbed inputs. What is the anti-pattern?',
        options: [
          'Adversarial attacks are impossible in practice',
          'For security-sensitive systems, validating only on clean data ignores a known threat model; adversarial robustness must be tested and hardened before deployment',
          'They should have used a smaller model',
          'Clean accuracy is the only relevant metric'
        ],
        correctIndex: 1,
        explanation: 'In adversarial settings, clean accuracy is insufficient. Threat modelling, robustness testing, and defences (e.g. adversarial training) are needed before trusting the model in security-critical use.',
        difficulty: 'hard'
      }
    ],

    // ---- 5.4.7 Self-supervised learning ----
    s7: [
      {
        id: 'dl-m4-s7-i1',
        q: 'What characterises self-supervised learning?',
        options: [
          'It requires extensive human labelling',
          'It creates supervisory signals from the data itself (via pretext tasks), learning representations without manual labels',
          'It uses no data',
          'It only works for regression'
        ],
        correctIndex: 1,
        explanation: 'Self-supervised learning generates its own labels from the structure of unlabelled data (e.g. predicting masked or transformed parts), learning useful representations without manual annotation.',
        difficulty: 'easy'
      },
      {
        id: 'dl-m4-s7-i2',
        q: 'What is a "pretext task" in self-supervised learning?',
        options: [
          'The final task you care about',
          'An auxiliary task (e.g. predicting rotation, filling in masked regions) used to learn representations that transfer to downstream tasks',
          'A task for labelling data manually',
          'A way to compute the loss on the test set'
        ],
        correctIndex: 1,
        explanation: 'A pretext task is a self-generated problem (rotation prediction, masked reconstruction, contrastive matching) whose solving forces the model to learn transferable representations.',
        difficulty: 'medium'
      },
      {
        id: 'dl-m4-s7-i3',
        q: 'Why has self-supervised learning become important for large-scale vision and language models?',
        options: [
          'It eliminates the need for any compute',
          'It exploits vast amounts of unlabelled data to pre-train strong general representations, which are then fine-tuned with little labelled data',
          'It guarantees no bias',
          'It only works on tiny datasets'
        ],
        correctIndex: 1,
        explanation: 'Self-supervision unlocks huge unlabelled corpora for pre-training, producing general representations that transfer well and need only modest labelled data downstream.',
        difficulty: 'medium'
      },
      {
        id: 'dl-m4-s7-i4',
        q: 'True or False: Representations learned by self-supervised pre-training can be fine-tuned for downstream tasks with relatively little labelled data.',
        options: [
          'False — self-supervised features are never reusable',
          'True — that transferability is a central benefit: pre-train on unlabelled data, then fine-tune on a small labelled set',
          'True — but only for text, never images',
          'False — fine-tuning requires more labels than training from scratch'
        ],
        correctIndex: 1,
        explanation: 'The point of self-supervised pre-training is transferable representations that fine-tune efficiently on small labelled datasets — a major practical advantage.',
        difficulty: 'medium'
      },
      {
        id: 'dl-m4-s7-i5',
        q: 'A team designs a self-supervised pretext task whose shortcut solution ignores image content (e.g. exploiting compression artefacts), then is puzzled that downstream transfer is poor. What is the "what not to do" lesson?',
        options: [
          'Self-supervised learning never works',
          'A poorly designed pretext task can be solved via trivial shortcuts that teach nothing useful; the pretext must force learning of meaningful, transferable structure',
          'They should have used more labelled data only',
          'Pretext tasks should always be as easy as possible'
        ],
        correctIndex: 1,
        explanation: 'If a pretext task has a trivial shortcut (artefacts, borders), the model exploits it without learning useful features, so transfer fails. Pretext tasks must be designed to require genuine understanding.',
        difficulty: 'hard'
      }
    ]
  }

};
